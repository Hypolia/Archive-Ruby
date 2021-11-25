import CacheService from 'App/Services/CacheService'
import Category from 'App/Models/Shop/Category'
import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import Offer from 'App/Models/Shop/Offer'
import {DateTime} from 'luxon'
import User from 'App/Models/User'
import Database from '@ioc:Adonis/Lucid/Database'
import Env from '@ioc:Adonis/Core/Env'
import PromotionalCode from 'App/Models/PromotionalCode'

export default class ShopsController {
  public async index () {
    return await CacheService.remember('shop-index', async () => {
      return await Category.query().select('id', 'name').preload('offers', (builder) => {
        builder.select('id', 'name', 'image', 'price', 'unique', 'version', 'deps', 'description')
      })
    }, '1h')
  }

  public async buy ({ params, response, auth, session }: HttpContextContract) {
    const offer = await Offer.query().where('id', params.id).firstOrFail()
    const { user } = auth

    if (!user) {
      return
    }

    let price = offer.price
    let promo: PromotionalCode | null = null

    if (params.promotion) {
      if (offer.unique || offer.version) {
        return response.globalError('L\'offre ne permet pas l\'utilisation d\'une promotion.')
      }

      promo = await PromotionalCode.query()
        .where('LOWER(code) LIKE ?', params.promotion.toLowerCase())
        .first()

      if (!promo) {
        response.globalError('La promotion utilisée n\'a pas été trouvé.')
        return
      }

      if (promo!.isExpired() || promo!.quantity <= 0) {
        return response.globalError('La promotion a expirée.')
      }

      price = Math.round(price * (1 - promo!.reduction / 100))
    }

    if (price > user.credit) {
      return response.globalError(`Il vous manque ${price - user.credit} crédit(s) pour effectuer cet achat.`)
    }

    if (offer.deps && !(await this.hasBuy(user, offer.deps, (offer.unique || offer.version)))) {
      return response.globalError('Vous ne remplissez pas toutes les conditions pour pouvoir effectuer cet achat.')
    }

    if (
      (offer.unique || offer.version || offer.categoryId === 1) &&
      (await this.hasBuy(user, offer.id, (offer.unique || offer.version)))
    ) {
      return response.globalError('Vous ne remplissez pas toutes les conditions pour pouvoir effectuer cet achat.')
    }

    user.credit -= price
    await user.save()

    if (promo) {
      promo.quantity--
      await promo.save()
    }

    await Database.insertQuery()
      .table('shop_histories')
      .insert({
        user_id: user.id,
        offer_id: offer.id,
        price: price,
        version: (offer.version ? Number(Env.get('SERVER_VERSION')) : -1),
      })

    if (offer.commands) {
      //const commands = `${offer.commands}|notifysite shop {playerName} ${offer.name}`
      //ServerService.execute(commands.replace(/{playerName}/g, user.username))
      // TODO: Mettre en place le systeme de commande serveur
    }

    if (offer.unique || offer.version || offer.categoryId === 1) {
      session.forget('offers')
    }

    session.forget('history-shop')

    return response.globalSuccess('L\'achat a bien été effectué.')
  }

  private async hasBuy (user: User, offer_id: number, versionOrUnique: boolean) {
    return (await Database.query().from('shop_histories')
      .where('user_id', user.id)
      .where('offer_id', offer_id)
      .where(builder => {
        if (versionOrUnique) {
          builder.whereIn('version', [-1, Number(Env.get('SERVER_VERSION'))])
        } else {
          builder.where('created_at', '>=', DateTime.local().minus({ month: 1 }).toSQL())
        }
      })
      .limit(1)).length > 0
  }
}
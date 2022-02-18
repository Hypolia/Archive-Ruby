import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Arkhane from 'App/Models/Arkhane'
import StoreValidator from 'App/Validators/arkhane/StoreValidator'

export default class ArkhanesController {

  public async index () {
    return Arkhane.query()
      .preload('stat')
      .preload('job')
  }

  public async show ({ params }: HttpContextContract) {
    return Arkhane.query()
      .where('minecraft_id', params.id)
      .preload('stat')
      .preload('job')
  }

  public async store ({ request }: HttpContextContract) {
    const data = await request.validate(StoreValidator)
    const arkhane = await Arkhane.create(data)

    await arkhane.related('job').create({
      "arkhaneId": arkhane.id
    })
    await arkhane.related('stat').create({
      "arkhaneId": arkhane.id
    })

    return { arkhane }
  }

  public async destroy ({ params, response}: HttpContextContract) {
    const arkhane = await Arkhane.findBy('minecraft_id', params.id)
    await arkhane?.delete()

    return response.ok("Le compte Arkhane a été supprimé")
  }
}

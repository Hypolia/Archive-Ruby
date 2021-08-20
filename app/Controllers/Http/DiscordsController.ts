import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import Discord from "App/Models/discord/Discord";
import StoreValidator from "App/Validators/discord/StoreValidator";
import UpdateValidator from "App/Validators/discord/UpdateValidator";
import User from "App/Models/User";

/*
|--------------------------------------------------------------------------
| Discords Controller
|--------------------------------------------------------------------------
|
| Author: @NathaelB
 */
export default class DiscordsController {

  /*
  |--------------------------------------------------------------------------
  | Method index | GET
  |--------------------------------------------------------------------------
  | Récupère tout les objets présent dans la table 'discord'
  | en les triant par ordre décroissant de leurs level
   */
  public async index() {
    /*return Discord.query().preload('discords', (discord) => {
      discord.orderBy('level', 'desc')
    })*/
    return Discord.all()
  }

  /*
  |--------------------------------------------------------------------------
  | Method show | GET
  |--------------------------------------------------------------------------
  | Récupère un objet sous un JSON de la table 'discord'
  | sous un paramètre 'user_id'
   */
  public async show({ params }: HttpContextContract) {
    return Discord.findBy("user_id", params.id)
  }

  /*
  |--------------------------------------------------------------------------
  | Method isPresent | GET
  |--------------------------------------------------------------------------
  | Récupère un boolean, selon si l'objet recherché
  | est bien présent dans la table 'discord'
   */
  public async isPresent({ params}: HttpContextContract) {
    const user = await Discord.findBy('user_id', params.id)
    return !!user
  }

  /*
  |--------------------------------------------------------------------------
  | Method store | POST
  |--------------------------------------------------------------------------
  | Envoie une requête via le StoreValidator pour créer un
  | objet Discord dans la table 'discord' avec plusieurs paramètres
   */
  public async store({ request }: HttpContextContract) {
    const data = await request.validate(StoreValidator)

    return await Discord.create(data)
  }

  /*
  |--------------------------------------------------------------------------
  | Method computeIfAbsent | POST
  |--------------------------------------------------------------------------
  | Envoie une requête via le StoreValidator pour créer un
  | objet Discord dans la table 'discord' avec plusieurs paramètres.
  | Vérifie si l'objet est déjà créer, si oui il ne fait rien.
   */
  public async computeIfAbsent({ params, request }: HttpContextContract) {
    const user = await Discord.findBy('user_id', params.id)
    if(!user) {
      const data = await request.validate(StoreValidator)
      return await Discord.create(data)
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Method update | PUT
  |--------------------------------------------------------------------------
  | Permet de mettre à jour un utilisateur selon un ou plusieurs
  | paramètres
   */
  public async update({ request, params, response }: HttpContextContract) {
    const user = await Discord.find(params.id)
    const data = await request.validate(UpdateValidator)
    await user?.merge(data).save()

    return response.ok("Le compte a été mis à jour")
  }

  /*
  |--------------------------------------------------------------------------
  | Method destroy | DESTROY
  |--------------------------------------------------------------------------
  | Supprime un objet dans la table 'discord'
   */
  public async destroy({ params, response }: HttpContextContract) {
    const user = await User.find(params.id)
    await user?.delete()

    return response.ok("Le compte a été supprimé")
  }

}

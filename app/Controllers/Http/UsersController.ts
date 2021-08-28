import User from "App/Models/User";
import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import StoreValidator from "App/Validators/users/StoreValidator";
import UpdateValidator from "App/Validators/users/UpdateValidator";

/**
 * Hypolia Inc | API Rest Source Code.
 * UsersController
 *
 * @license GPLv3
 * @copyright NathaelB
 */
export default class UsersController {

  /*
  |--------------------------------------------------------------------------
  | Method index | GET
  |--------------------------------------------------------------------------
  | Récupère tout les objets présent dans la table 'user'
  | en les triant par ordre décroissant de leurs permission_level
  | de leurs rôles
   */
  public async index() {
    return User.query().preload('roles', (role) => {
      role.orderBy('permission_level', 'desc')
    })
  }

  /*
  |--------------------------------------------------------------------------
  | Method show | GET
  |--------------------------------------------------------------------------
  | Récupère un objet sous un JSON de la table 'user'
  | sous un paramètre 'username'
   */
  public async show({ params }: HttpContextContract) {
    return User.findBy('username', params.id)
    /*return User.query().where('id', params.id).preload('roles', (role) => {
      role.orderBy('permission_level', 'desc')
    })*/
  }

  /*
  |--------------------------------------------------------------------------
  | Method isPresent | GET
  |--------------------------------------------------------------------------
  | Récupère un boolean, selon si l'objet recherché
  | est bien présent dans la table 'user'
   */
  public async isPresent({ params}: HttpContextContract) {
    const user = await User.findBy('username', params.id)
    return !!user
  }

  /*
  |--------------------------------------------------------------------------
  | Method store | POST
  |--------------------------------------------------------------------------
  | Envoie une requête via le StoreValidator pour créer un
  | objet User dans la table 'user' avec plusieurs paramètres
   */
  public async store({ request }: HttpContextContract) {
    const data = await request.validate(StoreValidator)

    return await User.create(data)
  }

  /*
  |--------------------------------------------------------------------------
  | Method computeIfAbsent | POST
  |--------------------------------------------------------------------------
  | Envoie une requête via le StoreValidator pour créer un
  | objet User dans la table 'user' avec plusieurs paramètres.
  | Vérifie si l'objet est déjà créer, si oui il ne fait rien.
   */
  public async computeIfAbsent({ params, request }: HttpContextContract) {
    const user = await User.findBy('uuid', params.id)
    if (!user) {
      const data = await request.validate(StoreValidator)
      return await User.create(data)
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
    const user = await User.find(params.id)
    const data = await request.validate(UpdateValidator)

    await user?.merge(data).save()
    if (data.roles) {
      await user?.related('roles').sync(data.roles)
    }
    return response.ok("Le compte a été mis à jour")
  }

  /*
  |--------------------------------------------------------------------------
  | Method destroy | DESTROY
  |--------------------------------------------------------------------------
  | Supprime un objet dans la table 'user'
   */
  public async destroy({ params, response }: HttpContextContract) {
    const user = await User.find(params.id)
    await user?.delete()

    return response.ok("Le compte a été supprimé")
  }
}

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
    /*return User.query().preload('roles', (role) => {
      role.orderBy('permission_level', 'desc')
    })*/
    return User.query()
      .preload('stats')
      .preload('jobs')
      .preload('roles')
  }

  /*
  |--------------------------------------------------------------------------
  | Method show | GET
  |--------------------------------------------------------------------------
  | Récupère un objet sous un JSON de la table 'user'
  | sous un paramètre 'username'
   */
  public async show({ params }: HttpContextContract) {
    return User.query()
      .where('username', params.id)
      .preload('roles')
      .preload('stats')
      .preload('jobs')
    //return User.findBy('username', params.id)
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
  public async store({ request, response }: HttpContextContract) {
    const user = await User.findBy('id', request.body().email)
    if (!user) {
      const data = await request.validate(StoreValidator)
      const userCreate = await User.create(data)
      const verifUser = await User.findBy('email', userCreate.email)
      await verifUser?.related('jobs').create({
        "userId": verifUser?.id
      })
      await verifUser?.related('stats').create({
        userId: verifUser?.id
      })
      return { verifUser }
      //return response.ok("[Success]: Le compte a été créé")
    }
    return response.ok("[Error]: Le compte est déjà existant")
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
    const roles = await request.input('roles')

    await user?.merge(data).save()
    if (roles) {
      await user?.related('roles').sync(roles)
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

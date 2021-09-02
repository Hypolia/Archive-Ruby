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
    return User.all()
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
  public async store({ request, response }: HttpContextContract) {
    const user = await User.findBy('id', request.body().email)
    if (!user) {
      const data = await request.validate(StoreValidator)
      const userCreate = await User.create(data)
      const verifUser = await User.findBy('email', userCreate.email)
      await verifUser?.related('jobs').create({
        mineur_exp: 0,
        mineur_level: 1,
        farmeur_exp: 0,
        farmeur_level: 1,
        foraging_exp: 0,
        foraging_level: 1,
        fishing_exp: 0,
        fishing_level: 1,
        combat_exp: 0,
        combat_level: 1,
        enchanteur_exp: 0,
        enchanteur_level: 1,
        alchimiste_exp: 0,
        alchimiste_level: 1
      })
      await verifUser?.related('stats').create({
        health: 100,
        defense: 20,
        strenght: 10,
        speed: 100,
        critChance: 20,
        critDamage: 20,
        intelligence: 100,
        miningFortune: 0,
        combatFortune: 0,
        farmingFortune: 0,
      })

      return response.ok("[Success]: Le compte a été créé")
    }
    return response.ok("[Error]: Le compte est déjà existant")
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
    /*if (data.roles) {
      await user?.related('roles').sync(data.roles)
    }*/
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

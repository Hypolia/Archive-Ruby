// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Minecraft from "App/Models/minecraft/Minecraft";
import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import StoreValidator from "App/Validators/minecraft/account/StoreValidator";
import UpdateValidator from "App/Validators/minecraft/account/UpdateValidator";

/*
|--------------------------------------------------------------------------
| Minecrafts Controller
|--------------------------------------------------------------------------
|
| Author: @NathaelB
 */
export default class MinecraftsController {

  /*
  |--------------------------------------------------------------------------
  | Method index | GET
  |--------------------------------------------------------------------------
  | Récupère tout les objets présent dans la table 'minecraft'
  | en les triant par ordre décroissant de leurs permission_level
  | de leurs rôles
   */
  public async index() {
    return Minecraft.query().preload('roles', (role) => {
      role.orderBy('permission_level', 'desc')
    })
    //return Minecraft.all()
  }

  /*
  |--------------------------------------------------------------------------
  | Method show | GET
  |--------------------------------------------------------------------------
  | Récupère un objet sous un JSON de la table 'minecraft'
  | sous un paramètre 'uuid'
   */
  public async show({ params }: HttpContextContract) {
    return Minecraft.findBy('uuid', params.id)
  }

  /*
  |--------------------------------------------------------------------------
  | Method isPresent | GET
  |--------------------------------------------------------------------------
  | Récupère un boolean, selon si l'objet recherché
  | est bien présent dans la table 'minecraft'
   */
  public async isPresent({ params }: HttpContextContract) {
    const user = await Minecraft.findBy('uuid', params.id)
    return !!user
  }

  /*
  |--------------------------------------------------------------------------
  | Method store | POST
  |--------------------------------------------------------------------------
  | Envoie une requête via le StoreValidator pour créer un
  | objet Minecraft dans la table 'minecraft' avec plusieurs paramètres
   */
  public async store({ request }: HttpContextContract) {
    const data = await request.validate(StoreValidator)

    return await Minecraft.create(data)
  }

  /*
  |--------------------------------------------------------------------------
  | Method computeIfAbsent | POST
  |--------------------------------------------------------------------------
  | Envoie une requête via le StoreValidator pour créer un
  | objet Minecraft dans la table 'minecraft' avec plusieurs paramètres.
  | Vérifie si l'objet est déjà créer, si oui il ne fait rien.
   */
  public async computeIfAbsent({ params, request }: HttpContextContract) {
    const user = await Minecraft.findBy('uuid', params.id)
    if (!user) {
      const data = await request.validate(StoreValidator)
      return await Minecraft.create(data)
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
    const user = await Minecraft.findBy('uuid', params.id)
    const data = await request.validate(UpdateValidator)

    await user?.merge(data).save()
    return response.ok("Le compte a été mis à jour")
  }

  /*
  |--------------------------------------------------------------------------
  | Method destroy | DESTROY
  |--------------------------------------------------------------------------
  | Supprime un objet dans la table 'minecraft'
   */
  public async destroy({ params, response}: HttpContextContract) {
    const user = await Minecraft.findBy('uuid', params.id)
    await user?.delete()

    return response.ok("Le compte a été supprimé")
  }
}

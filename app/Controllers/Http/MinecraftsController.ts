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
|--------------------------------------------------------------------------
 */
export default class MinecraftsController {

  /*
  |--------------------------------------------------------------------------
  | Method index | GET
  |--------------------------------------------------------------------------
  | Récupère tout les objets présent dans la table 'minecraft'
  | en les triant par ordre décroissant de leurs permission_level
  | de leurs rôles:
  | relation: jobs & roles
  |--------------------------------------------------------------------------
   */
  public async index() {
    console.log('test')
    return Minecraft.all()
  }

  /*
  |--------------------------------------------------------------------------
  | Method show | GET
  |--------------------------------------------------------------------------
  | Récupère un objet sous un JSON de la table 'minecraft'
  | sous un paramètre 'uuid'
  |--------------------------------------------------------------------------
   */
  public async show({ params }: HttpContextContract) {
    return await Minecraft.findBy('uuid', params.id)
  }

  /*
  |--------------------------------------------------------------------------
  | Method isPresent | GET
  |--------------------------------------------------------------------------
  | Récupère un boolean, selon si l'objet recherché
  | est bien présent dans la table 'minecraft'
  |--------------------------------------------------------------------------
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
  |--------------------------------------------------------------------------
   */
  public async store({ request, response }: HttpContextContract) {
    const user = await Minecraft.findBy('uuid', request.body().uuid)
    if (!user) {
      const data = await request.validate(StoreValidator)
      const client = await Minecraft.create(data)
      const minecraftUser = await Minecraft.findBy('uuid', client.uuid)
      await minecraftUser!.related('jobs').create({
        alchimiste_exp: 0,
        "combat_exp": 0,
        "foraging_exp": 0,
        "mineur_exp": 0,
        "farmeur_exp": 0,
        "enchanteur_exp": 0,
        "fishing_exp": 0,

        "alchimiste_level": 1,
        "combat_level": 1,
        "foraging_level": 1,
        "mineur_level": 1,
        "farmeur_level": 1,
        "enchanteur_level": 1,
        "fishing_level": 1
      })
      await minecraftUser!.related('stats').create({
        health: 100,
        defense: 20,
        strenght: 100,
        speed: 100,
        critChance: 50,
        critDamage: 50,
        intelligence: 100,
        miningFortune: 0,
        farmingFortune: 0,
        combatFortune: 0
      })
      return response.ok("[Success]: Le compte a été créé")
    } else {
      return response.ok("[Error]: Le compte est déjà existant")
    }

    //const user = await Minecraft.create(data)


  }

  /*
  |--------------------------------------------------------------------------
  | Method update | PUT
  |--------------------------------------------------------------------------
  | Permet de mettre à jour un utilisateur selon un ou plusieurs
  | paramètres.
  |--------------------------------------------------------------------------
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

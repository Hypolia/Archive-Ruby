// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import Discord from "App/Models/Discord";
import StoreValidator from "App/Validators/discord/StoreValidator";
import UpdateValidator from "App/Validators/discord/UpdateValidator";
import User from "App/Models/User";

/**
 * ------------------------------------------------------
 *  DiscordsController
 *
 *  Author: @NathaelB
 *  For: @Hypolia
 * ------------------------------------------------------
 */
export default class DiscordsController {

  /**
   * Method index | GET
   * ------------------------------
   * Retrieves all User objects present in the 'discords' table.
   * the preload function allows you to load the relationships
   * here 'roles' which can be sorted in descending order according
   * to the permission_level.
   */
  public async index() {
    return Discord.all()
  }

  /**
   * Method show | GET
   * ------------------------------
   * Method that returns a Discord object according to
   * a defined parameter (id, uuid, corners, ...)
   * @param params
   */
  public async show({ params, response }: HttpContextContract) {
    const user = Discord.findBy("user_id", params.id)
    console.log(response)
    return  user
  }

  /**
   * Method isPresent | GET
   * ------------------------------
   * Method that returns false or true if the user is
   * present if yes or no
   * @param params
   */
  public async isPresent({ params}: HttpContextContract) {
    const user = await Discord.findBy('user_id', params.id)
    return !!user
  }

  /**
   * Method store | POST
   * ------------------------------
   * Sends a request that the StoreValidator
   * creates the Discord object in the 'discords'
   * table with several parameters.
   * @param request
   */
  public async store({ request }: HttpContextContract) {
    const data = await request.validate(StoreValidator)

    return await Discord.create(data)
  }

  /**
   * Method computeIfAbsent | POST
   * ------------------------------
   * Sends a request to check if the discord_user is already
   * created according to the indicated parameters,
   * if it is not created it creates it
   * @param params
   * @param request
   */
  public async computeIfAbsent({ params, request }: HttpContextContract) {
    const user = await Discord.findBy('user_id', params.id)
    if(!user) {
      const data = await request.validate(StoreValidator)
      return await Discord.create(data)
    }
  }

  /**
   * Method update | PUT
   * ------------------------------
   * Modifies the Discord's optional
   * information with the UpdateValidator.
   * @param request
   * @param params
   * @param response
   */
  public async update({ request, params, response }: HttpContextContract) {
    const user = await Discord.find(params.id)
    const data = await request.validate(UpdateValidator)
    await user?.merge(data).save()

    return response.ok("Le compte a été mis à jour")
  }

  /**
   * Method destroy | DESTROY
   * ------------------------------
   * Retrieves the Discord and deletes
   * it from the 'discords' table
   * @param params
   * @param response
   */
  public async destroy({ params, response }: HttpContextContract) {
    const user = await User.find(params.id)
    await user?.delete()

    return response.ok("Le compte a été supprimé")
  }

}

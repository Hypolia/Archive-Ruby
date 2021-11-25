// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Discord from "App/Models/Discord";
import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";
import StoreValidator from "App/Validators/discords/StoreValidator";
import UpdateValidator from "App/Validators/discords/UpdateValidator";

export default class DiscordsController {

  public async index() {
    return Discord.all()
  }

  public async show({ params }: HttpContextContract) {
    return User.findBy('discord_id', params.id)
  }

  public async isPresent({ params }: HttpContextContract) {
    const user = await Discord.findBy('discord_id', params.id)
    return !!user
  }

  public async store({ request }: HttpContextContract) {
    const user = await Discord.findBy('discord_id', request.body().discord_id)
    if (!user) {
      const data = await request.validate(StoreValidator)
      return await Discord.create(data)
    }
  }

  public async update({ request, params, response}: HttpContextContract) {
    const user = await Discord.findBy('discord_id', params.id)
    const data = await request.validate(UpdateValidator)
    if (!user) return response.ok("Le compte n'existe pas !")
    return user?.merge(data).save();
  }
}

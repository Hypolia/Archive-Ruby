// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Discord from "App/Models/Discord";
import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import StoreValidator from "App/Validators/discords/StoreValidator";
import UpdateValidator from "App/Validators/discords/UpdateValidator";

export default class DiscordsController {

  public async index() {
    return Discord.all()
  }

  public async show({ params }: HttpContextContract) {
    return Discord.findBy('discord_id', params.id)
  }

  public async isPresent({ params }: HttpContextContract) {
    const user = await Discord.findBy('discord_id', params.id)
    return !!user
  }

  public async store({ request }: HttpContextContract) {
    const data = await request.validate(StoreValidator)
    return await Discord.create(data)

  }

  public async update({ request, params }: HttpContextContract) {
    const user = await Discord.findBy('discord_id', params.id)
    const data = await request.validate(UpdateValidator)
    return user?.merge(data).save()

    return { user }
  }
}

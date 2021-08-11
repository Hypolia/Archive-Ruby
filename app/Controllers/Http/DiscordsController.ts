// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import Discord from "App/Models/Discord";
import StoreValidator from "App/Validators/discord/StoreValidator";

export default class DiscordsController {

  public async index() {
    return Discord.all()
  }

  public async show({ params }: HttpContextContract) {
    return  Discord.findBy("user_id", params.id)
  }

  public async store({ request }: HttpContextContract) {
    const data = await request.validate(StoreValidator)

    return await Discord.create(data)
  }

  public async computeIfAbsent({ params, request }: HttpContextContract) {
    const user = await Discord.findBy('user_id', params.id)
    if(!user) {
      const data = await request.validate(StoreValidator)
      return await Discord.create(data)
    }

  }

/*  public async update({ request, params }: HttpContextContract) {
    const user = await Discord.find(params.id)
    const data = await request.validate(UpdateValidator)

  }*/
}

// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Discord from "App/Models/Discord";
import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import StoreValidator from "App/Validators/discords/StoreValidator";
import UpdateValidator from "App/Validators/discords/UpdateValidator";

export default class DiscordsController {

  public async index() {
    return Discord.query()
    .preload('ticket')
  }

  public async show({ params }: HttpContextContract) {
    return Discord.findBy('member_id', params.id)
  }

  public async isPresent({ params }: HttpContextContract) {
    const user = await Discord.findBy('member_id', params.id)
    return !!user
  }

  public async store({ request }: HttpContextContract) {
    const data = await request.validate(StoreValidator)
    return await Discord.create(data)

  }

  public async update({ request, params }: HttpContextContract) {
    const user = await Discord.findBy('member_id', params.id)
    const data = await request.validate(UpdateValidator)
    await user?.merge(data).save()
    if (data.ticket) {
      await user?.related('ticket').create({
        discordId: user.id,
        ticketId: data.ticket.ticketId,
        userId: user.memberId
      })
    }

    return { user }
  }
}

// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Ticket from "App/Models/discord/Ticket";
import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import StoreValidator from "App/Validators/ticket/StoreValidator";

export default class TicketsController {

  public async index() {
    return Ticket.all()
  }

  public async show({ params }: HttpContextContract) {
    return Ticket.findBy("channel_id", params.id)
  }

  public async store({ request }: HttpContextContract) {
    const data = await request.validate(StoreValidator)

    return await Ticket.create(data)
  }

  public async destroy({ params, response }: HttpContextContract) {
    const ticket = await Ticket.findBy('channel_id', params.id)
    await ticket?.delete()

    return response.ok("Le ticket a été supprimé")
  }
}

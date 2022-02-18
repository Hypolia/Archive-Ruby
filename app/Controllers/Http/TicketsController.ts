// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Ticket from 'App/Models/Ticket'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import StoreValidator from 'App/Validators/ticket/StoreValidator'
import {req} from "pino-std-serializers";
import Discord from "App/Models/Discord";

export default class TicketsController {

  public async index() {
    return Ticket.all()
  }

  public async show({ params }: HttpContextContract) {
    return Ticket
      .findByOrFail('user_id', params.id)
  }

  public async isPresent({ params }: HttpContextContract) {
    const ticket = await Ticket.findBy('user_id', params.id)
    return !!ticket
  }

  public async store({ request }: HttpContextContract) {
    const verif = await Ticket.findBy('discord_id', request.body().discord_id)
    if (!verif) {
      const data = await request.validate(StoreValidator)
      // @ts-ignore
      const ticket = await Ticket.create(data)
      const discord = await Discord.findByOrFail('member_id', request.body().discord_id) as Discord
      await discord.related('ticket').updateOrCreate({
        id: ticket.id,
        ticketId: ticket.ticketId,
        discordId: ticket.discordId
      }, )
      return { ticket }
    }
    return {verif}
  }

  public async destroy({ params, response }: HttpContextContract) {
    const ticket = await Ticket.findBy('ticket_id', params.id)
    await ticket?.delete()

    return response.ok("Le ticket vient d'être supprimé")
  }
}

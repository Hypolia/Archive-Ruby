// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Ticket from 'App/Models/Ticket'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import StoreValidator from 'App/Validators/ticket/StoreValidator'

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
    const verif = await Ticket.findBy('user_id', request.body().user_id)
    if (!verif) {
      const data = await request.validate(StoreValidator)
      const ticket = await Ticket.create(data)

      return { ticket }
    }
    return verif
  }

  public async destroy({ params, response }: HttpContextContract) {
    const ticket = await Ticket.findBy('ticket_id', params.id)
    await ticket?.delete()

    return response.ok("Le ticket vient d'être supprimé")
  }
}

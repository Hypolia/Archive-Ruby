// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Role from "App/Models/Role";
import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import StoreValidator from "App/Validators/roles/StoreValidator";
import UpdateValidator from "App/Validators/roles/UpdateValidator";

export default class RolesController {

  public async index() {
    return Role.all()
  }

  public async show({ params }: HttpContextContract) {
    return await Role.findBy('label', params.id)
  }

  public async isPresent({ params }: HttpContextContract) {
    const role = await Role.findBy('label', params.id)
    return !!role
  }

  public async store({ request, response }: HttpContextContract) {
    const rolePresent = await Role.findBy('label', request.body().label)
    if (!rolePresent) {
      const data = await request.validate(StoreValidator)
      await Role.create(data)
      return response.ok('Le rôle vient-être créé')
    }
    return response.ok('Le rôle est déjà créé')
  }

  public async update({ request, params, response }) {
    const role = await Role.findBy('label', params.id)
    const data = await request.validate(UpdateValidator)

    await role?.merge(data).save()
    return response.ok("Le rôle a été mis à jour")
  }

  public async destroy({ params, response}) {
    const role = await Role.findBy('label', params.id)
    await role?.delete()

    return response.ok("Le rôle a été supprimé")
  }
}

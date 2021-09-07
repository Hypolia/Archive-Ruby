// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Permission from "App/Models/Permission";
import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import StoreValidator from "App/Validators/permissions/StoreValidator";
import UpdateValidator from "App/Validators/permissions/UpdateValidator";

export default class PermissionsController {

  public async index() {
    return Permission.all()
  }

  public async show({ params }: HttpContextContract) {
    return await Permission.findBy('label', params.id)
  }

  public async isPresent({ params }: HttpContextContract) {
    const permission = await Permission.findBy('label', params.id)
    return !!permission
  }

  public async store({ request, response }: HttpContextContract) {
    const permissionPresent = await Permission.findBy('label', request.body().label)
    if (!permissionPresent) {
      const data = await request.validate(StoreValidator)
      const permission = await Permission.create(data)
      return { permission }
    }
    return response.ok('La permission est déjà créé')
  }

  public async update({ request, params, response }: HttpContextContract) {
    const permission = await Permission.findBy('label', params.id)
    const data = await request.validate(UpdateValidator)

    await permission?.merge(data).save()
    return response.ok('La permission a été mis à jour')
  }

  public async destroy({ params, response }) {
    const permission = await Permission.findBy('label', params.id)
    await permission?.delete()

    return response.ok('La permission a été supprimée')
  }
}

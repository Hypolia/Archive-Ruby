// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from "App/Models/User";
import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import StoreValidator from "App/Validators/users/StoreValidator";
import UpdateValidator from "App/Validators/users/UpdateValidator";

export default class UsersController {
  public async index() {
    return User.query().preload('roles', (role) => {
      role.orderBy('permission_level')
    })
  }

  public async show({ params }: HttpContextContract) {
    return User.query().where('id', params.id).preload('roles', (role) => {
      role.orderBy('permission_level', 'desc')
    })
  }

  public async store({ request }: HttpContextContract) {
    const data = await request.validate(StoreValidator)

    return await User.create(data)
  }

  public async update({ request, params }: HttpContextContract) {
    const user = await User.find(params.id)
    const data = await request.validate(UpdateValidator)

    await user?.merge(data).save()
    if (data.roles) {
      await user?.related('roles').sync(data.roles)
    }

    return { message: 'Le compte a été mis à jour' }
  }

  public async destroy({ params, response }: HttpContextContract) {
    const user = await User.find(params.id)
    await user?.delete()

    return response.ok("Le compte a été supprimé")
  }
}

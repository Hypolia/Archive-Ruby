// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from "App/Models/User";
import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import StoreValidator from "App/Validators/users/StoreValidator";
import UpdateValidator from "App/Validators/users/UpdateValidator";

export default class UsersController {
  public async index() {
    const users = await User.query().preload('roles', (role) => {
        role.orderBy('permission_level')
    })
    return { users }
  }

  public async show({ params }: HttpContextContract) {
    const user = await User.findOrFail(params.id)
    await user.preload('roles', (role) => {
      role.orderBy('permission_level')
    })
    return { user }
  }

  public async store({ request }: HttpContextContract) {
    console.log(request.all())
    const data = await request.validate(StoreValidator)
    const user = await User.create(data)

    return { user }
  }

  public async update({ request, params }: HttpContextContract) {
    const user = await User.findOrFail(params.id)
    const roles = await request.input('roles')
    const data = await request.validate(UpdateValidator)

    await user.merge(data).save()
    if (roles) {
      await user.related('roles').sync(roles)
    }

    return { message: 'Le compte a été mis à jour' }
  }
}

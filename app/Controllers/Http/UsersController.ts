// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from "App/Models/User";
import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import UserValidator from "App/Validators/UserValidator";

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
    const data = await request.validate(UserValidator)

    const user = await User.create(data)

    return { user }
  }
}

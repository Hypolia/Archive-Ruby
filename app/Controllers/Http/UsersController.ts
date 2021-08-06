// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from "App/Models/User";
import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";

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

  public async store({ params }: HttpContextContract) {
    const data = await request.validate()
  }
}

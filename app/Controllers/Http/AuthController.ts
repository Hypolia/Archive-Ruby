/**
 * Hypolia Inc | API Rest Source Code.
 * AuthController
 *
 * @license GPLv3
 * @copyright NathaelB
 */
import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";
import StoreValidator from "App/Validators/auth/StoreValidator";

export default class AuthController {

  public async loginApi({ request, auth, response }: HttpContextContract) {
    const data = await request.validate(StoreValidator)
    try {
      const token = await auth.use('api').attempt(data.email, data.password, {
        expiresIn: '7days'
      })
      return  { token: token.toJSON() }
    } catch (error) {
      return response.badRequest("Identifiants Incorrectes", true)
    }
  }

  public async logoutApi({ auth, response }: HttpContextContract): Promise<void> {
      await auth.use('api').logout()
      return response.ok('Vous avez été déconnecté')
  }

  public async user({ auth }: HttpContextContract): Promise<{user: User | null}> {
      const user = await User.query()
        .where('id', auth.user!.id)
        .preload('discord')
        .first()
      return { user }
  }
}

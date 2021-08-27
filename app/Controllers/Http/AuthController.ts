/**
 * Hypolia Inc | API Rest Source Code.
 * AuthController
 *
 * @license GPLv3
 * @copyright NathaelB
 */
import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";

export default class AuthController {

  public async loginApi({ request, auth, response }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    try {
      const token = await auth.use('api').attempt(email, password, {
        expiresIn: '5 days'
      })
      return {token: token.toJSON()}
    } catch {
      return response.badRequest('Identifiants Incorrectes')
    }
  }

  public async logoutApi({ auth, response }: HttpContextContract) {
      await auth.use('api').logout()
      return response.ok('Vous avez été déconnecté')
  }

  public async user({ auth }: HttpContextContract) {
      await auth.authenticate()
      return await User.query()
        .where('id', auth.user!.id)
        .preload('roles')
        .first()
  }
}

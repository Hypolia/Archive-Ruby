import User from "App/Models/User";
import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import StoreValidator from "App/Validators/users/StoreValidator";
import UpdateValidator from "App/Validators/users/UpdateValidator";

/**
 * ------------------------------------------------------
 *  UsersController
 *
 *  Author: @NathaelB
 *  For: @Hypolia
 * ------------------------------------------------------
 */
export default class UsersController {

  /**
   * Method index | GET
   * ------------------------------
   * Retrieves all User objects present in the 'users' table.
   * the preload function allows you to load the relationships
   * here 'roles' which can be sorted in descending order according
   * to the permission_level.
   */
  public async index() {
    return User.query().preload('roles', (role) => {
      role.orderBy('permission_level', 'desc')
    })
  }

  /**
   * Method show | GET
   * ------------------------------
   * Method that returns a User object according to
   * a defined parameter (id, uuid, corners, ...)
   * @param params
   */
  public async show({ params }: HttpContextContract) {
    return User.findBy('uuid', params.id)
    /*return User.query().where('id', params.id).preload('roles', (role) => {
      role.orderBy('permission_level', 'desc')
    })*/
  }

  /**
   * Method isPresent | GET
   * ------------------------------------------------------
   * Method that returns false or true if the user is
   * present if yes or no
   * @param params
   */
  public async isPresent({ params}: HttpContextContract) {
    const user = await User.findBy('uuid', params.id)
    return !!user
  }

  /**
   * Method store | POST
   * ------------------------------
   * Sends a request that the StoreValidator
   * creates the User object in the 'users'
   * table with several parameters.
   * @param request
   */
  public async store({ request }: HttpContextContract) {
    const data = await request.validate(StoreValidator)

    return await User.create(data)
  }

  /**
   * Method computeIfAbsent | POST
   * ------------------------------
   * Sends a request to check if the user is already
   * created according to the indicated parameters,
   * if it is not created it creates it
   * @param params
   * @param request
   */
  public async computeIfAbsent({ params, request }: HttpContextContract) {
    const user = await User.findBy('uuid', params.id)
    if (!user) {
      const data = await request.validate(StoreValidator)
      return await User.create(data)
    }
  }

  /**
   * Method update | PUT
   * ------------------------------
   * Modifies the User's optional
   * information with the UpdateValidator.
   * @param request
   * @param params
   */
  public async update({ request, params }: HttpContextContract) {
    const user = await User.find(params.id)
    const data = await request.validate(UpdateValidator)

    await user?.merge(data).save()
    if (data.roles) {
      await user?.related('roles').sync(data.roles)
    }

    return { message: 'Le compte a été mis à jour' }
  }

  /**
   * Method destroy | DESTROY
   * ------------------------------
   * Retrieves the User and deletes
   * it from the 'user' table
   * @param params
   * @param response
   */
  public async destroy({ params, response }: HttpContextContract) {
    const user = await User.find(params.id)
    await user?.delete()

    return response.ok("Le compte a été supprimé")
  }
}

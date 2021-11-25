import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    username: schema.string.optional({trim: true}),
    banned: schema.boolean.optional(),
    linked: schema.boolean.optional(),
    coins: schema.number.optional(),
    duration: schema.number.optional(),
    roles: schema.array.optional().members(schema.string({trim: true}, [rules.exists({column: 'id', table: 'roles'})])),
    permissions: schema.array.optional().members(schema.string()),
    user: schema.object.optional().members({
      username: schema.string.optional({trim: true}),
      email: schema.string.optional({ trim: true }, [rules.email(), rules.unique({ table: 'users', column: 'email' })]),
      password: schema.string.optional({ trim: true }, [rules.confirmed()]),
    })
  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages = {}
}

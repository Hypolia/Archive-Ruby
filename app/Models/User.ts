import { DateTime } from 'luxon'
import {
  BaseModel,
  beforeCreate,
  beforeSave,
  column,
  HasMany,
  hasMany,
  ManyToMany,
  manyToMany
} from '@ioc:Adonis/Lucid/Orm'
import Role from "App/Models/Role";
import Permission from "App/Models/Permission";
import Generate from "../../utils/GenerateUUID";
import Hash from '@ioc:Adonis/Core/Hash'

/**
 * Hypolia Inc | API Rest Source Code.
 * User Model
 *
 * @license GPLv3
 * @copyright NathaelB
 */
export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @beforeCreate()
  public static async createUUID (model: User) {
    model.id = Generate.generateUUID()
  }

  /**
   * Username Minecraft:
   * - MrNathael
   */
  @column()
  public username: string

  @column()
  public email: string

  @column()
  public password: string

  @column()
  public avatar: string

  @column()
  public credits: number

  @column()
  public votes: number

  @column()
  public banned: boolean

  @column()
  public confirmationToken: string

  @column()
  public recoveryToken: string

  @hasMany(() => Role)
  public roles: HasMany<typeof Role>

  @manyToMany(() => Permission)
  public permissions: ManyToMany<typeof Permission>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

}

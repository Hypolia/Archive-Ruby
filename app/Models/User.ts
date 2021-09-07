import { DateTime } from 'luxon'
import {
  BaseModel,
  beforeCreate,
  beforeSave,
  column, HasOne, hasOne, ManyToMany, manyToMany
} from '@ioc:Adonis/Lucid/Orm'
import Generate from "../../utils/GenerateUUID";
import Hash from '@ioc:Adonis/Core/Hash'
import Job from "App/Models/Job";
import Stat from "App/Models/Stat";
import Permission from "App/Models/Permission";
import Role from "App/Models/Role";

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

  @column()
  public uuid: string

  @column()
  public username: string

  @column()
  public email: string

  @column()
  public password: string

  @column()
  public credit: number

  @column()
  public coins: number

  @column()
  public banned: boolean

  @hasOne(() => Job)
  public jobs: HasOne<typeof Job>

  @hasOne(() => Stat)
  public stats: HasOne<typeof Stat>

  @manyToMany(() => Permission)
  public permissions: ManyToMany<typeof Permission>

  @manyToMany(() => Role)
  public roles: ManyToMany<typeof Role>

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

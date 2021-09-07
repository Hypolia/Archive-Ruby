import { DateTime } from 'luxon'
import {BaseModel, beforeCreate, column, ManyToMany, manyToMany} from '@ioc:Adonis/Lucid/Orm'
import Generate from "../../utils/GenerateUUID";
import Role from "App/Models/Role";
import User from "App/Models/User";

/*
|--------------------------------------------------------------------------
| Permission Model
|--------------------------------------------------------------------------
|
| Le model Permission caractérise un droit sur le serveur,
| elle peut être attribué à un rôle ou un user
|
| Author: @NathaelB
 */
export default class Permission extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @beforeCreate()
  public static async createUUID (model: Permission) {
    model.id = Generate.generateUUID()
  }

  @column()
  public label: string


  @manyToMany(() => Role)
  public roles: ManyToMany<typeof Role>

  @manyToMany(() => User)
  public users: ManyToMany<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

}

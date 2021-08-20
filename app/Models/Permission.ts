import { DateTime } from 'luxon'
import {BaseModel, beforeCreate, column} from '@ioc:Adonis/Lucid/Orm'
import Generate from "../../utils/GenerateUUID";

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

  @column()
  public name: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

}

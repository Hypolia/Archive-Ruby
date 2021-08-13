import { DateTime } from 'luxon'
import {BaseModel, beforeCreate, column} from '@ioc:Adonis/Lucid/Orm'
import Generate from "../../utils/GenerateUUID";

/*
|--------------------------------------------------------------------------
| Discord Model
|--------------------------------------------------------------------------
|
| Le model Discord représente le compte Discord de l'utilisateur,
| qui peut être relié au compte 'User'. Elle permet d'intégrer des
| donnés disponible sur discord et ainsi créer des évènements sur discord
| affectant le gameplay InGame.
|
| Author: @NathaelB
 */
export default class Discord extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @beforeCreate()
  public static async createUUID (model: Discord) {
    model.id = Generate.generateUUID()
  }

  @column()
  public userId: number

  @column()
  public level: number

  @column()
  public exp: number

  @column()
  public linked: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

import { DateTime } from 'luxon'
import {BaseModel, beforeCreate, column} from '@ioc:Adonis/Lucid/Orm'
import Generate from "../../../utils/GenerateUUID";

/*
|--------------------------------------------------------------------------
| Ticket Model
|--------------------------------------------------------------------------
|
| Le model Ticket permet de répertorier tout les
| tickets en cours, et permet donc de définir une
| limite de ticket par Utilisateur
|
| Author: @NathaelB
 */
export default class Ticket extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @beforeCreate()
  public static async createUUID (model: Ticket) {
    model.id = Generate.generateUUID()
  }

  @column()
  public userId: string

  @column()
  public channelId: string

  @column()
  public username: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

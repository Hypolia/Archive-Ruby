import { DateTime } from 'luxon'
import {BaseModel, beforeCreate, column} from '@ioc:Adonis/Lucid/Orm'
import Generate from "../../utils/GenerateUUID";

export default class Discord extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @beforeCreate()
  public static async createUUID (model: Discord) {
    model.id = Generate.generateUUID()
  }

  @column()
  public userId: string

  @column()
  public discordId: string

  @column()
  public username: string

  @column()
  public level: number

  @column()
  public exp: number

  @column()
  public langage: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

import { DateTime } from 'luxon'
import {BaseModel, beforeCreate, column, HasOne, hasOne} from '@ioc:Adonis/Lucid/Orm'
import Generate from "../../utils/GenerateUUID";
import Ticket from './Ticket';

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
  public memberId: string

  @column()
  public username: string

  @column()
  public level: number

  @column()
  public exp: number

  @column()
  public langage: string

  @hasOne(() => Ticket)
  public ticket: HasOne<typeof Ticket>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

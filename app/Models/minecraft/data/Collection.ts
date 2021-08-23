import { DateTime } from 'luxon'
import {BaseModel, beforeCreate, column} from '@ioc:Adonis/Lucid/Orm'
import Generate from "../../../../utils/GenerateUUID";

export default class Collection extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @beforeCreate()
  public static async createUUID (model: Collection) {
    model.id = Generate.generateUUID()
  }

  @column()
  public name: string

  @column()
  public level: number

  @column()
  public progression: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
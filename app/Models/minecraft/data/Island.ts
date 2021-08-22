import { DateTime } from 'luxon'
import {BaseModel, beforeCreate, column, ManyToMany, manyToMany} from '@ioc:Adonis/Lucid/Orm'
import Generate from "../../../../utils/GenerateUUID";
import Collection from "App/Models/minecraft/data/Collection";

export default class Island extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @beforeCreate()
  public static async createUUID (model: Island) {
    model.id = Generate.generateUUID()
  }

  @column()
  public name: string

  @column()
  public level: number

  @manyToMany(() => Collection)
  public collection: ManyToMany<typeof Collection>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

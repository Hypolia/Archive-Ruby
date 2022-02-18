import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Generate from '../../../utils/GenerateUUID'
import Category from './Categorie'

export default class Offer extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public categoryId: number

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public image: string

  @column()
  public price: number

  @column()
  public deps: number | null

  @column()
  public unique: boolean

  @column()
  public version: boolean

  @column()
  public commands: string

  @belongsTo(() => Category, {localKey: 'categorieId'})
  public category: BelongsTo<typeof Category>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async createUUID (model: Offer) {
    model.id = Generate.generateUUID()
  }
}

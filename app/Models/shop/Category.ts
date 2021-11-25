import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Generate from '../../../utils/GenerateUUID'
import Offer from './Offer'

export default class Category extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @hasMany(() => Offer, { foreignKey: 'categoryId'})
  public offers: HasMany<typeof Offer>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime


  @beforeCreate()
  public static async createUUID (model: Category) {
    model.id = Generate.generateUUID()
  }
}

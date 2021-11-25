import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm'
import Generate from '../../utils/GenerateUUID'

export default class PromotionalCode extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public code: string

  @column()
  public reduction: number

  @column()
  public quantity: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate() 
  public static async createUUID (model: PromotionalCode) {
    model.id = Generate.generateUUID()
  }

}

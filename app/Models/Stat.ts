import { DateTime } from 'luxon'
import {BaseModel, beforeCreate, column, HasOne, hasOne} from '@ioc:Adonis/Lucid/Orm'
import Generate from "../../utils/GenerateUUID";
import User from "App/Models/User";

export default class Stat extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @beforeCreate()
  public static async createUUID (model: Stat) {
    model.id = Generate.generateUUID()
  }

  @column()
  public health: number

  @column()
  public defense: number

  @column()
  public strenght: number

  @column()
  public speed: number

  @column()
  public critChance: number

  @column()
  public critDamage: number

  @column()
  public intelligence: number

  @column()
  public miningFortune: number

  @column()
  public farmingFortune: number

  @column()
  public combatFortune: number

  @hasOne(() => User)
  public user: HasOne<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

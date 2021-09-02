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
  public userId: string

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

  @beforeCreate()
  public static async defaultValue(stat: Stat) {
    stat.health = 100
    stat.defense = 20
    stat.strenght = 10
    stat.speed = 100
    stat.critChance = 20
    stat.critDamage = 20
    stat.intelligence = 100
    stat.miningFortune = 0
    stat.combatFortune = 0
    stat.farmingFortune = 0
  }
}

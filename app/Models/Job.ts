import { DateTime } from 'luxon'
import {BaseModel, beforeCreate, column, HasOne, hasOne} from '@ioc:Adonis/Lucid/Orm'
import Generate from "../../utils/GenerateUUID";
import User from "App/Models/User";

export default class Job extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @beforeCreate()
  public static async createUUID (model: Job) {
    model.id = Generate.generateUUID()
  }

  /*
  Mineur Job
   */
  @column()
  public mineur_level: number

  @column()
  public mineur_exp: number

  /*
  Farmeur Job
   */
  @column()
  public farmeur_level: number

  @column()
  public farmeur_exp: number

  /*
  Foraging Job
   */
  @column()
  public foraging_level: number

  @column()
  public foraging_exp: number

  /*
  Fishing Job
   */
  @column()
  public fishing_level: number

  @column()
  public fishing_exp: number

  /*
  Combat Job
   */
  @column()
  public combat_level: number

  @column()
  public combat_exp: number

  /*
  Enchanteur Job
   */
  @column()
  public enchanteur_level: number

  @column()
  public enchanteur_exp: number

  /*
  Alchimiste Job
   */
  @column()
  public alchimiste_level: number

  @column()
  public alchimiste_exp: number

  @hasOne(() => User)
  public user: HasOne<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

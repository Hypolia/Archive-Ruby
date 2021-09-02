import { DateTime } from 'luxon'
import {BaseModel, beforeCreate, column} from '@ioc:Adonis/Lucid/Orm'
import Generate from "../../utils/GenerateUUID";

export default class Job extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @beforeCreate()
  public static async createUUID (model: Job) {
    model.id = Generate.generateUUID()
  }

  @column()
  public userId: string

  /*
  Mineur Job
   */
  @column()
  public mineurLevel: number

  @column()
  public mineurExp: number

  /*
  Farmeur Job
   */
  @column()
  public farmeurLevel: number

  @column()
  public farmeurExp: number

  /*
  Foraging Job
   */
  @column()
  public foragingLevel: number

  @column()
  public foragingExp: number

  /*
  Fishing Job
   */
  @column()
  public fishingLevel: number

  @column()
  public fishingExp: number

  /*
  Combat Job
   */
  @column()
  public combatLevel: number

  @column()
  public combatExp: number

  /*
  Enchanteur Job
   */
  @column()
  public enchanteurLevel: number

  @column()
  public enchanteurExp: number

  /*
  Alchimiste Job
   */
  @column()
  public alchimisteLevel: number

  @column()
  public alchimisteExp: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async defaultValue(job: Job) {
    job.mineurExp = 0
    job.mineurLevel = 1
    job.farmeurExp = 0
    job.farmeurLevel = 1
    job.foragingExp = 0
    job.foragingLevel = 1
    job.fishingExp = 0
    job.fishingLevel = 1
    job.combatExp = 0
    job.combatLevel = 1
    job.enchanteurExp = 0
    job.enchanteurLevel = 1
    job.alchimisteExp = 0
    job.alchimisteLevel = 1
  }

}

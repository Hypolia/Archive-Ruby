import { DateTime } from 'luxon'
import {BaseModel, beforeCreate, column, ManyToMany, manyToMany} from '@ioc:Adonis/Lucid/Orm'
import Generate from "../../../utils/GenerateUUID";
import Role from "App/Models/Role";
import Permission from "App/Models/Permission";
import Job from "App/Models/minecraft/data/Job";
import Island from "App/Models/minecraft/data/Island";
import Stat from "App/Models/minecraft/data/Stat";

/*
|--------------------------------------------------------------------------
| Minecraft Model
|--------------------------------------------------------------------------
|
| Le model Minecraft représente les données du joueur Minecraft.
|
| Author: @NathaelB
 */
export default class Minecraft extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @beforeCreate()
  public static async createUUID (model: Minecraft) {
    model.id = Generate.generateUUID()
  }

  @column()
  public uuid: string

  @column()
  public username: string

  @column()
  public banned: boolean

  @column()
  public linked: boolean

  @column()
  public coins: number

  @column()
  public duration: number

  /*
  |--------------------------------------------------------------------------
  | Minecraft RelationShips | @manyToMany
  |--------------------------------------------------------------------------
  | - Island
  | - Job
  | - Role
  | - Permission
  | - Stat
   */
  @manyToMany(() => Island)
  public island: ManyToMany<typeof Island>

  @manyToMany(() => Job, {
    pivotTable: 'job_minecraft',
    localKey: 'id',
    pivotForeignKey: 'minecrafts_id',
    pivotRelatedForeignKey: 'jobs_id',
    relatedKey: 'id'
  })
  public jobs: ManyToMany<typeof Job>

  @manyToMany(() => Stat)
  public stats: ManyToMany<typeof Stat>

  @manyToMany(() => Role)
  public roles: ManyToMany<typeof Role>

  @manyToMany(() => Permission)
  public permissions: ManyToMany<typeof Permission>

  /**
   * Column for date
   * - Create DateTime
   * - Update DateTime
   */
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

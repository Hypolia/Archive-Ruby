import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, BelongsTo, belongsTo, column, hasMany, HasOne, hasOne, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Generate from "../../utils/GenerateUUID";
import User from './User'
import Job from './Job'
import Stat from './Stat'
import Permission from './Permission'
import Role from './Role'
import Discord from './Discord';


export default class Minecraft extends BaseModel {
  @column({ isPrimary: true })
  public id: string

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

  @hasOne(() => User)
  public user: HasOne<typeof User>

  @hasOne(() => Job)
  public jobs: HasOne<typeof Job>

  @hasOne(() => Stat)
  public stats: HasOne<typeof Stat>

  @manyToMany(() => Permission)
  public permissions: ManyToMany<typeof Permission>

  @manyToMany(() => Role)
  public roles: ManyToMany<typeof Role>


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async createUUID (model: Minecraft) {
    model.id = Generate.generateUUID()
  }
}

import { DateTime } from 'luxon'
import {BaseModel, column, ManyToMany, manyToMany} from '@ioc:Adonis/Lucid/Orm'
import Role from "App/Models/Role";

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  /**
   * UUID Minecraft:
   * - 403e6cb7-a6ca-440a-8041-7fb1e579b5a5
   */
  @column()
  public uuid: string

  /**
   * Username Minecraft:
   * - MrNathael
   */
  @column()
  public username: string

  @column()
  public coins: number

  @column()
  public pb: number

  @column()
  public email: string

  @column()
  public isBan: boolean

  /**
   * Si le compte est relié à
   * discord
   */
  @column()
  public isLink: boolean

  @manyToMany(() => Role)
  public roles: ManyToMany<typeof Role>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

}

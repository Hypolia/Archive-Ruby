import { DateTime } from 'luxon'
import {BaseModel, beforeCreate, column, ManyToMany, manyToMany} from '@ioc:Adonis/Lucid/Orm'
import Role from "App/Models/Role";
import Permission from "App/Models/Permission";
import Generate from "../../utils/GenerateUUID";
import Discord from "App/Models/Discord";

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @beforeCreate()
  public static async createUUID (model: User) {
    model.id = Generate.generateUUID()
  }

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
  public banned: boolean

  /**
   * Si le compte est relié à
   * discord
   */
  @column()
  public linked: boolean

  @manyToMany(() => Role)
  public roles: ManyToMany<typeof Role>

  @manyToMany(() => Permission)
  public permissions: ManyToMany<typeof Permission>

  @manyToMany(() => Discord)
  public discord: ManyToMany<typeof  Discord>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  /*protected generateUuid(): void {
    this.id = Generate.generateUUID()
  }*/



}

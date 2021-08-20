import { DateTime } from 'luxon'
import {BaseModel, beforeCreate, column, ManyToMany, manyToMany} from '@ioc:Adonis/Lucid/Orm'
import Role from "App/Models/Role";
import Permission from "App/Models/Permission";
import Generate from "../../utils/GenerateUUID";
import Discord from "App/Models/discord/Discord";
import Minecraft from "App/Models/Minecraft";

/*
|--------------------------------------------------------------------------
| User Model
|--------------------------------------------------------------------------
|
| Le model User représente le compte principal que l'utilisateur
| pourra créer via le SiteWeb
|
| Author: @NathaelB
 */
export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @beforeCreate()
  public static async createUUID (model: User) {
    model.id = Generate.generateUUID()
  }

  /**
   * Username Minecraft:
   * - MrNathael
   */
  @column()
  public username: string

  @column()
  public email: string

  @column()
  public password: string

  @column()
  public avatar: string

  @column()
  public credits: number

  @column()
  public votes: number

  @column()
  public banned: boolean

  @column()
  public rememberMeToken: string

  @manyToMany(() => Role)
  public roles: ManyToMany<typeof Role>

  @manyToMany(() => Permission)
  public permissions: ManyToMany<typeof Permission>

  @manyToMany(() => Discord)
  public discord: ManyToMany<typeof  Discord>

  @manyToMany(() => Minecraft)
  public minecraft: ManyToMany<typeof Minecraft>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

}

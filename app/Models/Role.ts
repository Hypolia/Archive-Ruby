import { DateTime } from 'luxon'
import {BaseModel, beforeCreate, column, ManyToMany, manyToMany} from '@ioc:Adonis/Lucid/Orm'
import Permission from "App/Models/Permission";
import Generate from "../../utils/GenerateUUID";

/**
 * Hypolia Inc | API Rest Source Code.
 * Role Model
 *
 * @license GPLv3
 * @copyright NathaelB
 */
export default class Role extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @beforeCreate()
  public static async createUUID (model: Role) {
    model.id = Generate.generateUUID()
  }

  @column()
  public label: string

  @column()
  public name: string

  @column()
  public permissionLevel: number

  @column()
  public color: string

  @column()
  public tablist: string

  @column()
  public default: boolean

  @manyToMany(() => Permission)
  public permissions: ManyToMany<typeof Permission>



  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

}

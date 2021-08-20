import { DateTime } from 'luxon'
import {BaseModel, beforeCreate, column, ManyToMany, manyToMany} from '@ioc:Adonis/Lucid/Orm'
import Permission from "App/Models/Permission";
import Generate from "../../utils/GenerateUUID";


/*
|--------------------------------------------------------------------------
| Role Model
|--------------------------------------------------------------------------
|
| Le model Role permet de gérer l'ensemble des roles présents
| sur Hypolia, où on peut lui attribuer une ou des permissions.
|
| Author: @NathaelB
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

  @manyToMany(() => Permission)
  public permissions: ManyToMany<typeof Permission>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

}

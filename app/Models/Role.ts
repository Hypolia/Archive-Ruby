import { DateTime } from 'luxon'
import {BaseModel, column, ManyToMany, manyToMany} from '@ioc:Adonis/Lucid/Orm'
import Permission from "App/Models/Permission";

export default class Role extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public slug: string

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

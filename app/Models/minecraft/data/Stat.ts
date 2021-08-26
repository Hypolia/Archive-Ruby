import { DateTime } from 'luxon'
import {BaseModel, beforeCreate, column} from '@ioc:Adonis/Lucid/Orm'
import Generate from "../../../../utils/GenerateUUID";

/*
|--------------------------------------------------------------------------
| Stat for Account Minecraft Model
|--------------------------------------------------------------------------
|
| Le model Stat représente les statistiques du compte
| Minecraft.
|
| Author: @NathaelB
 */
export default class Stat extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @beforeCreate()
  public static async createUUID (model: Stat) {
    model.id = Generate.generateUUID()
  }

  @column()
  public minecraftId: string

  @column()
  public health: number

  @column()
  public defense: number

  @column()
  public strenght: number

  @column()
  public speed: number

  @column()
  public critChance: number

  @column()
  public critDamage: number

  @column()
  public intelligence: number

  @column()
  public miningFortune: number

  @column()
  public farmingFortune: number

  @column()
  public combatFortune: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

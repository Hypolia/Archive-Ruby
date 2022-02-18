import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Generate from '../../utils/GenerateUUID'
import Island from './Island'
import Stat from './Stat'
import Job from './Job'

export default class Arkhane extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @beforeCreate()
  public static async CreateUUID (model: Arkhane) {
    model.id = Generate.generateUUID()
  }

  @column()
  public minecraftId: string

  @hasOne(() => Island)
  public island: HasOne<typeof Island>


  @hasOne(() => Stat)
  public stat: HasOne<typeof Stat>

  @hasOne(() => Job)
  public job: HasOne<typeof Job>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

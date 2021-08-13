import BaseSchema from '@ioc:Adonis/Lucid/Schema'

/*
|--------------------------------------------------------------------------
| Discords Migrations
|--------------------------------------------------------------------------
|
| Author: @NathaelB
 */
export default class Discords extends BaseSchema {
  protected tableName = 'discords'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.string('user_id').notNullable().unique()
      table.integer('level')
      table.integer('exp')
      table.boolean('linked')

      table.timestamps(true, true)
      //table.timestamp('created_at', { useTz: true })
      //table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

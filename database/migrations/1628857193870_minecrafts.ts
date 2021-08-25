import BaseSchema from '@ioc:Adonis/Lucid/Schema'

/*
|--------------------------------------------------------------------------
| Minecraft Migrations
|--------------------------------------------------------------------------
|
| Author: @NathaelB
 */
export default class Minecrafts extends BaseSchema {
  protected tableName = 'minecrafts'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id', 60).primary()
      table.string('uuid').unique().notNullable()
      table.string('username').unique().notNullable()
      table.boolean('banned')
      table.boolean('linked')
      table.integer('coins')
      table.integer('duration')

      table.timestamps(true, true)
      //table.timestamp('created_at', { useTz: true })
      //table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

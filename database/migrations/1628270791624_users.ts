import BaseSchema from '@ioc:Adonis/Lucid/Schema'


/*
|--------------------------------------------------------------------------
| Users Migrations
|--------------------------------------------------------------------------
|
| Author: @NathaelB
 */
export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id', 60).primary()
      table.string('uuid').notNullable().unique()
      table.string('username').notNullable().unique()
      table.string('email').notNullable().unique()
      table.string('password').notNullable()
      table.integer('credit')
      table.double('coins')
      table.boolean('banned')

      table.timestamps(true, true)
      //table.timestamp('created_at', { useTz: true })
      //table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

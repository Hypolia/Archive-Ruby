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
      table.string('username').notNullable()
      table.string('email').notNullable()
      table.string('password').notNullable()
      table.string('avatar')
      table.integer('credits')
      table.integer('votes')
      table.boolean('banned')
      table.string('remember_me_token')

      table.timestamps(true, true)
      //table.timestamp('created_at', { useTz: true })
      //table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

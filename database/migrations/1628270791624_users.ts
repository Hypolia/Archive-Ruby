import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.string('uuid').notNullable()
      table.string('username').notNullable()
      table.string('email')
      table.integer('coins')
      table.integer('pb')
      table.boolean('banned')
      table.boolean('linked')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamps(true, true)
      //table.timestamp('created_at', { useTz: true })
      //table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

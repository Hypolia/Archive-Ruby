import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class MinecraftRoles extends BaseSchema {
  protected tableName = 'minecraft_role'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('minecraft_id').references('id').inTable('minecrafts')
      table.string('role_id').references('id').inTable('roles')

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

import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class JobMinecrafts extends BaseSchema {
  protected tableName = 'job_minecraft'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('minecraft_id').references('id').inTable('minecrafts')
      table.string('job_id').references('id').inTable('jobs')

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

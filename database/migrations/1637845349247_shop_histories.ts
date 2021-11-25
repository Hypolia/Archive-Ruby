import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ShopHistories extends BaseSchema {
  protected tableName = 'shop_histories'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('user_id').unsigned()
      table.integer('offer_id').unsigned()
      table.integer('price').unsigned()
      table.integer('version').defaultTo(-1)
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamps(true, true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

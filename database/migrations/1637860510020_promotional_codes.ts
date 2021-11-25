import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class PromotionalCodes extends BaseSchema {
  protected tableName = 'promotional_codes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id')
      table.string('code').notNullable()
      table.integer('reduction').notNullable()
      table.integer('quantity').defaultTo(-1)
      table.timestamp('expore_at').nullable()

      table.timestamps(true, true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

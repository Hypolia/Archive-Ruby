import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class PaymentPrices extends BaseSchema {
  protected tableName = 'payment_prices'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id')
      table.string('method')
      table.decimal('price')
      table.integer('credits')

      table.timestamps(true, true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

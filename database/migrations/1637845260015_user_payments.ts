import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UserPayments extends BaseSchema {
  protected tableName = 'user_payments'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id')
      table.string('user_id').unsigned()
      table.string('method')
      table.decimal('price')
      table.string('currency').defaultTo('EUR')
      table.decimal('payout')
      table.integer('credits')
      table.json('data').nullable()
      
      table.timestamps(true, true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

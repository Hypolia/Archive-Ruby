import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ShopCategories extends BaseSchema {
  protected tableName = 'shop_categories'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id')
      table.string('name')
      table.integer('priority').defaultTo(0)
      table.timestamps(true, true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

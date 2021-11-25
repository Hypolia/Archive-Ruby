import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Minecrafts extends BaseSchema {
  protected tableName = 'minecrafts'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.string('uuid').unique()
      table.string('username')

      table.boolean('banned')
      table.boolean('linked')
      table.integer('coins')
      table.integer('duration')

      table.timestamps(true, true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Arkhanes extends BaseSchema {
  protected tableName = 'arkhanes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.string('minecraft_id').unique().notNullable()
      table.timestamps(true, true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

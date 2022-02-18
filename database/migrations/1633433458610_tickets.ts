import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Tickets extends BaseSchema {
  protected tableName = 'tickets'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.string('discord_id').unique()
      table.string('ticket_id').unique()

      table.timestamps(true, true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

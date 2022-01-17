import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Discords extends BaseSchema {
  protected tableName = 'discords'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.string('user_id').unique()
      table.string('member_id').notNullable().unique()
      table.string('username').notNullable()
      table.integer('level').notNullable()
      table.integer('exp').notNullable()
      table.integer('langage')

      table.timestamps(true, true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

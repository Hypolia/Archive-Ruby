import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Jobs extends BaseSchema {
  protected tableName = 'jobs'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id', 60).primary()

      table.double('mineur_level').notNullable()
      table.double('mineur_exp').notNullable()

      table.double('farmeur_level').notNullable()
      table.double('farmeur_exp').notNullable()

      table.double('foraging_level').notNullable()
      table.double('foraging_exp').notNullable()

      table.double('fishing_level').notNullable()
      table.double('fishing_exp').notNullable()

      table.double('combat_level').notNullable()
      table.double('combat_exp').notNullable()

      table.double('enchanteur_level').notNullable()
      table.double('enchanteur_exp').notNullable()

      table.double('alchimiste_level').notNullable()
      table.double('alchimiste_exp').notNullable()

      table.string('user_id').references('uuid').inTable('users').onDelete('CASCADE')

      table.timestamps(true, true)
      //table.timestamp('created_at', { useTz: true })
      //table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

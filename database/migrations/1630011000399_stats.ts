import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Stats extends BaseSchema {
  protected tableName = 'stats'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id', 60).primary()

      table.integer('health').notNullable()
      table.integer('defense').notNullable()
      table.integer('strenght').notNullable()
      table.integer('speed').notNullable()
      table.integer('crit_chance').notNullable()
      table.integer('crit_damage').notNullable()
      table.integer('intelligence').notNullable()

      table.integer('mining_fortune').notNullable()
      table.integer('farming_fortune').notNullable()
      table.integer('combat_fortune').notNullable()


      table.string('user_id').references('id').inTable('users').onDelete('CASCADE')

      table.timestamps(true, true)
      //table.timestamp('created_at', { useTz: true })
      //table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class MinecraftPermission extends BaseSchema {
  protected tableName = 'minecraft_permission'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('minecraft_id').references('id').inTable('minecrafts')
      table.string('permission_id').references('id').inTable('permissions')

      table.unique(['minecraft_id', 'permission_id'])
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

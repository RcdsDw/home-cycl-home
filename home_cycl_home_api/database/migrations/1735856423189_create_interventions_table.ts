import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Intervention extends BaseSchema {
  protected tableName = 'interventions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.timestamp('started_at').notNullable()
      table.timestamp('ended_at').notNullable()

      table.float('price').notNullable()
      table.string('service').notNullable()
      table.string('bike').notNullable()
      table.integer('user_id').unsigned().references('id').inTable('users').notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

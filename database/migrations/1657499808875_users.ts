import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UserlndsSchema extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('email', 255).notNullable().unique()
      table.string('password', 180).notNullable()
      table.string('name')
      table.string('tell')
      table.float('pesinhos_month')
      table.float('pesinhos_years')
      table.float('avulso')
      table.float('subs')
      table.string('typeuser')
      table.string('remember_me_token').nullable()

      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}

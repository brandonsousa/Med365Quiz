'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SurveySchema extends Schema {
  up () {
    this.create('surveys', (table) => {
      table.increments()
      table.integer('user_id').references('id').inTable('users').onDelete('NO ACTION').onUpdate('CASCADE')
      table.integer('answer_id').unsigned().references('id').inTable('answers').onDelete('CASCADE').onUpdate('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('surveys')
  }
}

module.exports = SurveySchema

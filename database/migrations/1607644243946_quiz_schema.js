'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class QuizSchema extends Schema {
  up() {
    this.create('quizzes', (table) => {
      table.increments()
      table.integer('user_id').references('id').inTable('users').onDelete('NO ACTION').onUpdate('CASCADE')
      table.string('title', 80).notNullable()
      table.text('description')
      table.timestamps()
    })
  }

  down() {
    this.drop('quizzes')
  }
}

module.exports = QuizSchema

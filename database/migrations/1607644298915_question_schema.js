'use strict'

/** @type { typeof import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class QuestionSchema extends Schema {
  up () {
    this.create('questions', (table) => {
      table.increments()
      table.integer('quiz_id').unsigned().references('id').inTable('quizzes').onDelete('CASCADE').onUpdate('CASCADE')
      table.text('description').notNullable()
      table.boolean('isMultipleChoice').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('questions')
  }
}

module.exports = QuestionSchema

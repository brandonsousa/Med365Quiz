'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class QuizSchema extends Schema {
  up () {
    this.create('quizzes', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('NO ACTION').onUpdate('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('quizzes')
  }
}

module.exports = QuizSchema

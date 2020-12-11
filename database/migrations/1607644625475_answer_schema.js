'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AnswerSchema extends Schema {
  up () {
    this.create('answers', (table) => {
      table.increments()
      table.integer('question_id').unsigned().references('id').inTable('questions').onDelete('CASCADE').onUpdate('CASCADE')
      table.text('descrition').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('answers')
  }
}

module.exports = AnswerSchema

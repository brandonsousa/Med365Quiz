'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Answer extends Model {
    question() {
        return this.belongsTo('App/Models/Question')
    }
    survey() {
      return this.belongsTo('App/Models/Survey')
    }
}

module.exports = Answer

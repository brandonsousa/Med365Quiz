'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Question extends Model {
    
    answers() {
        return this.hasMany('App/Models/Answer')
    }

    quiz() {
        return this.belongsTo('App/Models/Quiz')
    }
}

module.exports = Question

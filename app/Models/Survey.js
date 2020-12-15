'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Survey extends Model {
  user() {
    return this.belongsTo('App/Models/User')
  }
  questions() {
    return this.hasMany('App/Models/Question')
  }
  answer() {
    return this.hasMany('App/Models/Answer')
  }
}

module.exports = Survey

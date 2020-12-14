'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')
const moment = require("moment")
class User extends Model {

  static get hidden() {
    return ['password']
  }
  static get dates() {
    return super.dates.concat(["init", 'end']);
  }

  static castDates(field, value) {
    if (field == "init" || field == 'end') return value ? value.format("DD/MM/YYYY") : value;
    else return value ? value.format("DD/MM/YYYY hh:mm a") : value;
  }

  static formatDates(field, value) {
    if (field == "init" || field == 'end')
      return moment(value, "DD/MM/YYYY").format("YYYY-MM-DD");

    return super.formatDates(field, value);
  }

  static boot() {
    super.boot()
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  quizzes() {
    return this.hasMany('App/Models/Quiz')
  }

}

module.exports = User

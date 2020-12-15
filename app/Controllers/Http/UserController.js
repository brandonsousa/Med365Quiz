'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User')

const Database = use('Database')
class UserController {

  async index({ response, auth }) {
    const me = await User.query().where('id', auth.user.id).with('quizzes.questions.answers').fetch()
    if (me) {
      return response.status(200).send({
        status: 'success',
        data: me.toJSON()
      })
    }
    return response.status(400).send({
      status: 'error',
      data: 'Error, nothing to you'
    })
  }

  async store({ request, response }) {
    const data = request.only(['username', 'email', 'password'])
    try {
      if (data.password.length > 6) {
        const user = await User.create({
          ...data
        })
        if (user) {
          return response.status(201).send({
            status: 'success',
            data: 'User created, do login'
          })
        }
      }
      return response.status(400).send({
        status: 'error',
        data: 'Error, user not created'
      })
    } catch (error) {
      return response.status(400).send({
        status: 'error',
        data: `Error, ${error.message}`
      })
    }
  }

  async mySurveys({ response, auth }) {
    const surveys = await Database.raw('SELECT quiz.title AS "quiz_title", quiz.description AS "quiz_description", q.id AS "question_id", q.description AS "question_description", a.id AS "answer_id", a.description AS "answer_description",DATE_FORMAT(s.created_at, "%d/%c/%Y at %H:%i:%s") created_at,DATE_FORMAT(s.updated_at, "%d/%c/%Y at %H:%i:%s") updated_at ' +
      'FROM answers AS a ' +
      'INNER JOIN surveys AS s ON s.answer_id = a.id ' +
      'INNER JOIN questions AS q ON a.question_id = q.id ' +
      'INNER JOIN quizzes AS quiz ON q.quiz_id = quiz.id ' +
      'WHERE s.user_id = ?', [auth.user.id])
    if (surveys) {
      return response.status(200).send({
        status: 'success',
        data: surveys[0]
      })
    }
    return response.status(200).send({
      status: 'error',
      data: 'Nothing to show'
    })
  }

  async update({ request, response, auth }) {
    const data = request.only(['username', 'email'])
    try {
      const user = await User.find(auth.user.id)
      if (user) {
        user.merge({ ...data })
        await user.save()
        return response.status(200).send({
          status: 'success',
          data: 'User updated'
        })
      }
      return response.status(400).send({
        status: 'error',
        data: 'Error, user not updated'
      })
    } catch (error) {
      return response.status(400).send({
        status: 'error',
        data: `Error, ${error.message}`
      })
    }
  }

  async destroy({ params, response, auth }) {
    const user = await User.find(params.id)
    if (user && user.id === auth.user.id) {
      try {
        await user.delete()
        return response.status(200).send({
          status: 'success',
          data: 'User deleted'
        })
      } catch (error) {
        return response.status(400).send({
          status: 'error',
          data: `Error, ${error.message}`
        })
      }
    }
    return response.status(400).send({
      status: 'error',
      data: 'Error, user not exist or not is you'
    })
  }
}

module.exports = UserController

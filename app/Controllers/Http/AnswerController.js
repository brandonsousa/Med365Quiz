'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Answer = use('App/Models/Answer')
const Question = use('App/Models/Question')
const Quiz = use('App/Models/Quiz')
class AnswerController {

  async index({ params, response, auth }) {
    if (this.isOWner(params.question_id, params.quiz_id, auth.user.id)) {
      const answers = await Answer.query().where('question_id', params.question_id).fetch()
      if (answers.rows.length != 0) {
        return response.status(200).send({
          status: 'success',
          data: answers.toJSON()
        })
      }
    }
    return response.status(400).send({
      status: 'error',
      data: `Nothing found or you don't have access`
    })
  }

  async store({ request, response, auth, params }) {
    const data = request.only(['description'])
    if ( await this.isOWner(params.question_id, params.quiz_id, auth.user.id) && data.description) {
      try {
        const answer = await Answer.create({
          question_id: params.question_id,
          ...data
        })
        if (answer) {
          return response.status(201).send({
            status: 'success',
            data: 'Answer created'
          })
        }
      } catch (error) {
        return response.status(400).send({
          status: 'error',
          data: `Error, ${error.message}`
        })
      }
    }
    return response.status(401).send({
      status: 'error',
      data: 'Error, invalid data or you are trying to add a answer to a question that is not yours'
    })
  }

  async destroy({ params, response, auth }) {
    const answer = await Answer.find(params.answer_id)
    if (answer && this.isOWner(params.question_id, auth.user.id)) {
      try {
        await answer.delete()
        return response.status(200).send({
          status: 'success',
          data: 'answer deleted success from question'
        })
      } catch (error) {
        return response.status(400).send({
          status: 'error',
          data: `Error, ${error.message}`
        })
      }
    }
    return response.status(401).send({
      status: 'error',
      data: 'Error, you are trying to delete something that does not exist or is not yours'
    })
  }

  async isOWner(question_id, quiz_id, user) {
    const question = await Question.find(question_id)
    if (question) {
      const quiz = await Quiz.find(quiz_id)
      if (quiz && question.quiz_id == quiz.id) {
        return quiz.user_id === user ? true : false
      }
    }
    return false
  }
}

module.exports = AnswerController

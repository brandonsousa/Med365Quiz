'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Quiz = use('App/Models/Quiz')
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Question = use('App/Models/Question')

class QuestionController {

  async index({ response, params, auth }) {
    const quiz = await Quiz.find(params.quiz_id)
    if (quiz && quiz.user_id === auth.user.id) {
      const questions = await Question.query().where('quiz_id', quiz.id).with('answers').fetch()
      if (questions) {
        return response.status(200).send({
          status: 'success',
          data: questions
        })
      }
      return response.status(400).send({
        status: 'error',
        data: 'This quiz has no questions yet to be displayed'
      })
    }
    return response.status(400).send({
      status: 'error',
      data: 'Error, you are trying to view something that does not exist or is not yours'
    })
  }

  async store({ request, response, auth, params }) {
    const data = request.only(['description'])
    const quiz = await Quiz.find(params.quiz_id)
    if (quiz) {
      if (quiz.user_id == auth.user.id) {
        try {
          const question = await Question.create({
            quiz_id: quiz.id,
            ...data
          })
          if (question) {
            return response.status(201).send({
              status: 'success',
              data: `Question created ${question.id}`
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
        data: 'Error, you are trying to add a question to a quiz that is not yours'
      })
    }
    return response.status(400).send({
      status: 'error',
      data: 'Error, this quiz not exist'
    })
  }

  async destroy({ params, response, auth }) {
    const question = await Question.find(params.question_id)
    const quiz = await Quiz.find(params.quiz_id)
    if (question && quiz && question.quiz_id == quiz.id && quiz.user_id === auth.user.id) {
      try {
        await question.delete()
        return response.status(200).send({
          status: 'success',
          data: 'Question deleted'
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
      data: 'Error, you are trying to delete something that does not exist or is not yours'
    })
  }
}

module.exports = QuestionController

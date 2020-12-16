'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Quiz = use('App/Models/Quiz')
class QuizController {

  async index({ response, auth }) {
    const quizzes = await Quiz.query().where('user_id', auth.user.id).with('questions.answers').fetch()
    if (quizzes) {
      return response.status(200).send({
        status: 'success',
        data: quizzes.toJSON()
      })
    }
    return response.status(400).send({
      status: 'error',
      data: 'you no have quizzes created'
    })
  }

  async store({ request, response, auth }) {
    const data = request.only(['title', 'description'])
    if (data.title.length != 0) {
      try {
        const newQuiz = await Quiz.create({
          user_id: auth.user.id,
          ...data
        })
        if (newQuiz) {
          return response.status(201).send({
            status: 'success',
            data: `New quiz created, id ${newQuiz.id}`
          })
        }
        return response.status(400).send({
          status: 'error',
          data: 'Nothing was created'
        })
      } catch (error) {
        return response.status(400).send({
          status: 'error',
          data: error.message
        })
      }
    }
    return response.status(400).send({
      status: 'error',
      data: 'title required'
    })
  }

  async show({ params, response, auth }) {
    try {
      const quiz = await Quiz.query().where('id', params.id).with('questions.answers').fetch()
      if (quiz && quiz.toJSON()[0].user_id === auth.user.id) {
        return response.status(200).send({
          status: 'success',
          data: quiz.toJSON()
        })
      }
      return response.status(400).send({
        status: 'error',
        data: 'nothing found or this quiz is not your'
      })
    } catch (error) {
      return response.status(400).send({
        status: 'error',
        data: error.message
      })
    }

  }

  async update({ params, request, response, auth }) {
    const data = request.only(['title', 'description'])
    try {
      const quiz = await Quiz.find(params.id)
      if (quiz && quiz.user_id == auth.user.id) {
        quiz.merge({ ...data })
        await quiz.save()
        return response.status(200).send({
          status: 'success',
          data: 'quiz updated success'
        })
      }
      return response.status(400).send({
        status: 'error',
        data: 'nothing found or you can not update this quiz'
      })
    } catch (error) {
      return response.status(400).send({
        status: 'error',
        data: error.message
      })
    }
  }

  async destroy({ params, response, auth }) {
    try {
      const quiz = await Quiz.find(params.id)
      if (quiz && quiz.user_id == auth.user.id) {
        await quiz.delete()
        return response.status(200).send({
          status: 'success',
          data: 'quiz deleted success'
        })
      }
      return response.status(400).send({
        status: 'error',
        data: 'nothing found or you can not delete this quiz'
      })
    } catch (error) {
      return response.status(400).send({
        status: 'error',
        data: error.message
      })
    }
  }
}

module.exports = QuizController

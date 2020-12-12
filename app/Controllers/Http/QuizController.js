'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Quiz = use('App/Models/Quiz')
class QuizController {
  /**
   * Show a list of all quizzes.
   * GET quizzes
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async index({ response, auth }) {
    const quizzes = await Quiz.query().where('user_id', auth.user.id).with('questions').fetch()
    if (quizzes) {
      return response.status(200).send({
        data: quizzes.toJSON()
      })
    }
    return response.status(400).send({
      data: 'you no have quizzes created'
    })
  }

  /**
   * Create/save a new quiz.
   * POST quizzes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, auth }) {
    const data = request.only(['title', 'description'])
    try {
      const newQuiz = await Quiz.create({
        user_id: auth.user.id,
        ...data
      })
      if (newQuiz) {
        return response.status(201).send({
          data: `New quiz created, id ${newQuiz.id}`
        })
      }
      return response.status(400).send({
        data: 'Nothing was created'
      })
    } catch (error) {
      return response.status(400).send({
        data: error.message
      })
    }
  }

  /**
   * Display a single quiz.
   * GET quizzes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, response }) {
    try {
      const quiz = await Quiz.find(params.id)
      quiz.load('questions')
      if (quiz) {
        return response.status(200).send({
          data: quiz.toJSON()
        })
      }
      return response.status(400).send({
        data: 'nothing found'
      })
    } catch (error) {
      return response.status(400).send({
        data: error.message
      })
    }

  }

  /**
   * Update quiz details.
   * PUT or PATCH quizzes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response, auth }) {
    const data = request.only(['title', 'description'])
    try {
      const quiz = await Quiz.find(params.id)

      if (quiz && quiz.user_id == auth.user.id) {

        quiz.merge({ ...data })
        await quiz.save()
        return response.status(200).send({
          data: 'quiz updated success'
        })
      }

      return response.status(400).send({
        data: 'nothing found or you can not update this quiz'
      })
    } catch (error) {

      return response.status(400).send({
        data: error.message
      })
    }
  }

  /**
   * Delete a quiz with id.
   * DELETE quizzes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, response, auth }) {
    try {
      const quiz = await Quiz.find(params.id)
      if (quiz && quiz.user_id == auth.user.id) {
        await quiz.delete()
        return response.status(200).send({
          data: 'quiz deleted success'
        })
      }
      return response.status(400).send({
        data: 'nothing found or you can not delete this quiz'
      })
    } catch (error) {
      return response.status(400).send({
        data: error.message
      })
    }
  }
}

module.exports = QuizController

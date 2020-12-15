"use strict"

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Survey = use("App/Models/Survey")
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Answer = use("App/Models/Answer")
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Quiz = use("App/Models/Quiz")

class SurveyController {
  async index({ response }) {
    const quizzes = await Quiz.query().with('questions.answers').fetch()
    if (quizzes) {
      const quizzesToShow = []
      for (const quiz of quizzes.toJSON()) {
        if (quiz.questions.length != 0) {
          quizzesToShow.push(quiz)
        }
      }
      return response.status(200).send({
        status: "success",
        data: quizzesToShow
      })
    }
    return response.status(400).send({
      status: "error",
      data: "Nothing to show",
    })
  }

  async store({ request, response, auth }) {
    const { answers } = request.only(['answers'])
    const success = []
    const error = []
    for (const answer of answers) {
      const existsAnswer = await Answer.find(answer.id)
      if (existsAnswer) {
        try {
          const survey = await Survey.create({
            user_id: auth.user.id,
            answer_id: answer.id
          })
          if (survey) {
            success.push({
              data: `answer ${existsAnswer.description} added to question ${existsAnswer.question_id}`
            })
          } else {
            error.push({
              data: `error when adding answer ${answer.description} to question ${answer.question_id}`
            })
          }
        } catch (error) {
          error.push({
            data: `error ${error.message} when adding answer ${answer.description} to question ${answer.question_id}`
          })
        }
      } else {
        error.push({
          data: `error, answer ${answer.id} not exist`
        })
      }
    }
    return response.status(200).send({
      data: {
        success: success,
        error: error
      }
    })
  }
}

module.exports = SurveyController


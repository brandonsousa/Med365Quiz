const { test, trait } = use('Test/Suite')('Test the AnswerController actions')

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const payload = require('../payload')

trait('Test/ApiClient')
trait('Auth/Client')

test('must return that the answer was created', async ({ assert, client }) => {
    const user = await payload.userPayload()
    const quiz = await payload.quizPayload(user.id)
    const question = await payload.questionPayload(quiz.id)
    const answer = await Factory.model('App/Models/Answer').make()
    const response = await client.post(`/quiz/${quiz.id}/questions/${question.id}/answers`)
        .loginVia(user)
        .send({
            description: answer.description
        })
        .end()
    response.assertStatus(201)
    assert.equal(response.body.status, 'success')
    assert.exists(response.body.data)
})

test('must return all answers to the question', async ({ assert, client }) => {
    const user = await payload.userPayload()
    const quiz = await payload.quizPayload(user.id)
    const response = await client.get(`/quiz/${quiz.id}/questions`).loginVia(user).end()
    response.assertStatus(200)
    assert.equal(response.body.status, 'success')
    assert.exists(response.body.data)
})

test('must return that the answer was deleted', async ({ assert, client }) => {
    const user = await payload.userPayload()
    const quiz = await payload.quizPayload(user.id)
    const question = await payload.questionPayload(quiz.id)
    const { id } = await payload.answerPayload(question.id)
    const response = await client.delete(`/quiz/${quiz.id}/questions/${question.id}/answers/${id}`)
        .loginVia(user)
        .end()
    response.assertStatus(200)
    assert.equal(response.body.status, 'success')
})
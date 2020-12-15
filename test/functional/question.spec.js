const { test, trait } = use('Test/Suite')('Test of Questions Actions')

const payload = require('../payload')

trait('Test/ApiClient')
trait('Auth/Client')

test('must list all quiz questions informed in the url by the logged in user', async ({ assert, client }) => {
    const user = await payload.userPayload()
    const quiz = await payload.quizPayload(user.id)
    await payload.questionPayload(quiz.id)
    const response = await client.get(`/quiz/${quiz.id}/questions`)
        .loginVia(user)
        .end()

    response.assertStatus(200)
    assert.equal(response.body.status, 'success')
})
test('must return that the question was created in the quiz', async ({ assert, client }) => {
    const user = await payload.userPayload()
    const quiz = await payload.quizPayload(user.id)
    const question = await payload.quizPayload()
    const response = await client.post(`/quiz/${quiz.id}/questions`)
        .loginVia(user)
        .send({
            description: question.description
        })
        .end()

    response.assertStatus(201)
    assert.equal(response.body.status, 'success')
})
test('must return if it is possible to exclude the question from the questionnaire', async ({ assert, client }) => {
    const user = await payload.userPayload()
    const quiz = await payload.quizPayload(user.id)
    const question = await payload.quizPayload()
    const response = await client.delete(`/quiz/${quiz.id}/questions/${question.id}`)
        .loginVia(user)
        .end()
    response.assertStatus(200)
    assert.equal(response.body.status, 'success')
})

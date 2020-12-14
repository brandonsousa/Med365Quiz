const { test, trait } = use('Test/Suite')('Test the QuizController actions')

const payload = require('../payload')

trait('Test/ApiClient')
trait('Auth/Client')

test('must list all the quizzes along with their questions from the logged in user', async ({ assert, client }) => {

    const user = await payload.userPayload()

    const quizzes = await payload.manyQuizPayload(6, user.id)

    for await (const quiz of quizzes) {
        await payload.questionPayload(quiz.id)
    }

    const response = await client.get('/quiz').loginVia(user).end()
    response.assertStatus(200)
}).timeout(0)

test('unauthenticated user cannot create quiz', async ({ client }) => {
    const response = await client.post('/quiz').send().end()
    response.assertStatus(401)
})

test('must return that the quiz was created', async ({ assert, client }) => {

    const user = await payload.userPayload()

    const { title, description } = await payload.quizPayload(user.id)

    const response = await client.post('/quiz').loginVia(user).send({
        title: title,
        body: description,
    }).end()

    response.assertStatus(201)
    assert.exists(response.body)
})

test('must return a quiz by your id along with your questions', async ({ assert, client }) => {

    const user = await payload.userPayload()

    const { id } = await payload.quizPayload(user.id)


    const response = await client.get(`/quiz/${id}`).loginVia(user).end()
    response.assertStatus(200)
    assert.exists(response.body.data)
})

test('must be able to update the data of a quiz if it belongs to the logged in user', async ({ assert, client }) => {

    const user = await payload.userPayload()

    const { id } = await payload.quizPayload(user.id)

    const response = await client.put(`/quiz/${id}`).loginVia(user).send({
        title: 'updated on test',
        description: ''
    }).end()

    response.assertStatus(200)
    assert.exists(response.body.data)
})

test('must be able to delete a quiz if it belongs to the logged in user', async ({ assert, client }) => {

    const user = await payload.userPayload()

    const { id } = await payload.quizPayload(user.id)

    const response = await client.delete(`/quiz/${id}`).loginVia(user).end()

    response.assertStatus(200)
    assert.exists(response.body.data)
})
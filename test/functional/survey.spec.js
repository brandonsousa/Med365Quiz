const { test, trait } = use('Test/Suite')('Test the SurveyController actions')

const payload = require('../payload')

trait('Test/ApiClient')
trait('Auth/Client')

test('must return all questions and answers', async ({ assert, client }) => {
  const response = await client.get('/').end()
  response.assertStatus(200)
  assert.equal(response.body.status, 'success')
  assert.exists(response.body.data)
})

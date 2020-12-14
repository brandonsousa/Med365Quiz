const { test, trait } = use('Test/Suite')('Test the AuthController actions')

const payload = require('../payload')

trait('Test/ApiClient')

test('it should return JWT when user do signin', async ({ assert, client }) => {
  
  const user = await payload.userPayload()

  const response = await client.post('/auth/signin').send({
    email: user.email,
    password: payload.userPassword()
  }).end()

  response.assertStatus(200)
  assert.exists(response.body.token)
})

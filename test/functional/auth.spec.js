const { test, trait } = use('Test/Suite')('Authentication')

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

trait('Test/ApiClient')

test('it should return JWT when user do signin', async ({ assert, client }) => {
  const password = 'pass1234'
  const user = await Factory.model('App/Models/User').create({
    password: password
  })

  const response = await client.post('/auth/signin').send({
    email: user.email,
    password: password
  }).end()

  response.assertStatus(200)
  assert.exists(response.body.token)
})

const { test, trait } = use('Test/Suite')('Test the UserController actions')

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const payload = require('../payload')

trait('Test/ApiClient')
trait('Auth/Client')

test('must return the logged user data', async ({ assert, client }) => {
    const user = await payload.userPayload()
    const response = await client.get('/user').loginVia(user).end()
    response.assertStatus(200)
    assert.equal(response.body.status, 'success')
})
test('must return that the user was created', async ({ assert, client }) => {
    const { email, username } = await Factory.model('App/Models/User').make()
    const response = await client.post('/user')
        .send({
            username: username,
            email: email,
            password: payload.userPassword()
        })
        .end()
    response.assertStatus(201)
    assert.equal(response.body.status, 'success')
})

test('must return error if trying to create a user with existing email', async ({ assert, client }) => {
    const user = await payload.userPayload()
    const response = await client.post('/user')
        .send({
            username: user.username,
            email: user.email,
            password: payload.userPassword()
        })
        .end()
    response.assertStatus(400)
    assert.equal(response.body.status, 'error')
})

test('must return that user was updated', async ({ assert, client }) => {
    const user = await payload.userPayload()
    const { email, username } = await Factory.model('App/Models/User').make()
    const response = await client.put(`/user/${user.id}`)
        .loginVia(user)
        .send({
            username: username,
            email: email
        }).end()
    response.assertStatus(200)
    assert.equal(response.body.status, 'success')
})
test('must return that the user account has been deleted', async ({ assert, client }) => {
    const user = await payload.userPayload()
    const response = await client.delete(`/user/${user.id}`)
        .loginVia(user)
        .end()
    response.assertStatus(200)
    assert.equal(response.body.status, 'success')
})

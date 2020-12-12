'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
Factory.blueprint('App/Models/User', (faker, i, data = {}) => {
    return Object.assign({
        username: faker.name(),
        email: faker.email()
    }, data)
})

Factory.blueprint('App/Models/Quiz', (faker, i, data = {}) => {
    return Object.assign({
        title: faker.sentence({ words: 7 }),
        description: faker.paragraph({ sentences: 3 })
    }, data)
})

Factory.blueprint('App/Models/Question', (faker, i, data = {}) => {
    return Object.assign({
        description: faker.paragraph({ sentences: 3 }),
        isMultipleChoice: faker.bool()
    }, data)
})

Factory.blueprint('App/Models/Answer', (faker, i, data = {}) => {
    return Object.assign({
        description: faker.paragraph({ sentences: 3 })
    }, data)
})

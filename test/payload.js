/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class Payload {
    static user = null
    static quiz = null
    static question = null

    async userPayload() {
        if (Payload.user != null) {
            return Payload.user
        }
        const password = 'pass1234'

        const user = await Factory.model('App/Models/User').create({
            password: password
        })

        Payload.user = user.toJSON()

        return Payload.user
    }

    async quizPayload(user) {
        if (Payload.quiz != null) {
            return Payload.quiz
        }

        const quiz = await Factory.model('App/Models/Quiz').create({
            user_id: user
        })

        Payload.quiz = quiz.toJSON()

        return Payload.quiz
    }

    async questionPayload(quiz) {
        if (Payload.question != null) {
            return Payload.question
        }

        const question = await Factory.model('App/Models/Question').create({
            quiz_id: quiz
        })

        Payload.question = question.toJSON()

        return Payload.question
    }
}

module.exports = new Payload()
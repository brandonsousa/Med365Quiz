/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class Payload {
    static user = null
    static quiz = null
    static manyQuizzes = null
    static question = null
    static answer = null

    userPassword() {
        return 'pass1234'
    }

    async userPayload() {
        if (Payload.user != null) {
            return Payload.user
        }
        const user = await Factory.model('App/Models/User').create({
            password: this.userPassword
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

    async manyQuizPayload(numberOfRows, user) {
        if (Payload.manyQuizzes != null) {
            return Payload.manyQuizzes
        }
        const quizzes = await Factory.model('App/Models/Quiz').createMany(numberOfRows, {
            user_id: user
        })
        Payload.manyQuizzes = quizzes
        return Payload.manyQuizzes
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

    async answerPayload(question) {
        if (Payload.answer != null) {
            return Payload.answer
        }
        const answer = await Factory.model('App/Models/Answer').create({ question_id: question })
        Payload.answer = answer.toJSON()
        return Payload.answer
    }
}

module.exports = new Payload()
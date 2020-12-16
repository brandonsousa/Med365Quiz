'use strict'

class AuthController {
    async siginin({ request, response, auth }) {
        const { email, password } = request.only(['email', 'password'])
        try {
            const { token } = await auth.attempt(email, password)
            return response.status(200).send({ token: token })
        } catch (error) {
            return response.status(401).send({
                error: error.message
            })
        }
    }
}

module.exports = AuthController

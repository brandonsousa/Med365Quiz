'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User')
class UserController {

    async index({ response, auth }) {
        const me = await User.query().where('id', auth.user.id).with('quizzes').fetch()
        if (me) {
            return response.status(200).send({
                status:'success',
                data: me.toJSON()
            })
        }
        return response.status(400).send({
            status:'error',
            data: 'Error, nothing to you'
        })
    }

    async store({ request, response }) {
        const data = request.only(['username', 'email', 'password'])
        try {
            if (data.password.length > 6) {
                const user = await User.create({
                    ...data
                })
                if (user) {
                    return response.status(201).send({
                        status: 'success',
                        data: 'User created, do login'
                    })
                }
            }
            return response.status(400).send({
                status: 'error',
                data: 'Error, user not created'
            })
        } catch (error) {
            return response.status(400).send({
                status: 'error',
                data: `Error, ${error.message}`
            })
        }
    }

    async update({ request, response, auth }) {
        const data = request.only(['username', 'email'])
        try {
            const user = await User.find(auth.user.id)
            if (user) {
                user.merge({ ...data })
                await user.save()
                return response.status(200).send({
                    status: 'success',
                    data: 'User updated'
                })
            }
            return response.status(400).send({
                status: 'error',
                data: 'Error, user not updated'
            })
        } catch (error) {
            return response.status(400).send({
                status: 'error',
                data: `Error, ${error.message}`
            })
        }
    }

    async destroy({ params, response, auth }) {
        const user = await User.find(params.id)
        if (user && user.id === auth.user.id) {
            try {
                await user.delete()
                return response.status(200).send({
                    status: 'success',
                    data: 'User deleted'
                })
            } catch (error) {
                return response.status(400).send({
                    status: 'error',
                    data: `Error, ${error.message}`
                })
            }
        }
        return response.status(400).send({
            status: 'error',
            data: 'Error, user not exist or not is you'
        })
    }
}

module.exports = UserController

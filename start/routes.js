'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
  Route.post('/signin', 'AuthController.siginin')
  Route.get('/logout', 'AuthController.logout')
}).prefix('auth')

Route.group(() => {
  Route.resource('/', 'QuizController').apiOnly()
  Route.resource('/:quiz_id/questions/', 'QuestionController').only(['index', 'store'])
  Route.delete('/:quiz_id/questions/:question_id', 'QuestionController.destroy')
}).prefix('quiz').middleware('auth')

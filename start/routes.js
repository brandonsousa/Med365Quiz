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

Route.get('/', 'SurveyController.index')
Route.post('/survey/answer', 'SurveyController.store').middleware('auth')

Route.group(() => {
  Route.post('/signin', 'AuthController.siginin')
  Route.get('/logout', 'AuthController.logout')
}).prefix('auth')

Route.group(() => {
  Route.resource('/', 'QuizController').apiOnly()
  Route.resource('/:quiz_id/questions/', 'QuestionController').only(['index', 'store'])
  Route.delete('/:quiz_id/questions/:question_id', 'QuestionController.destroy')
  Route.resource('/:quiz_id/questions/:question_id/answers', 'AnswerController').only(['index', 'store'])
  Route.delete('/:quiz_id/questions/:question_id/answers/:answer_id', 'AnswerController.destroy')
}).prefix('quiz').middleware('auth')

Route.group(() => {
  Route.post('/', 'UserController.store')
  Route.resource('/', 'UserController').only(['index', 'update','destroy']).middleware('auth')
  Route.get('/surveys', 'UserController.mySurveys').middleware('auth')
}).prefix('user')

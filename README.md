# Med365Quiz
Api to evaluate quiz developed in the Med365 challenge

**Used [adonisJS v4.1](https://adonisjs.com/)**

## To run in development/production
  1. install the dependencies by terminal with yarn or npm
  2. configure the _.env_ file with your information
  3. on terminal run:
      > adonis migration:run
  4. to start server
      - development
        > adonis serve --dev
      - production
        > adonis serve

        or
        > node .\server.js
## To run test
_tests performed on the SQLite database_
  1. install the dependencies by terminal with yarn or npm
  2. on terminal run:
      > adonis test
  3. the tests were carried out on:
      - AuthController
        - Signin
      - UserController
        - Retrieve user data
        - Store user
        - Update user
        - Destroy user
        - Try create with registered email
      - QuizController
        - Store
        - Retrieve all with question and answer
        - Retrieve by id with question and answer
        - Update
        - Destroy
      - QuestionController
        - Retrieve
        - Destroy
        - Store
      - AnswerController
        - Retrieve
        - Destroy
        - Store
      - SurveyController
        - Retrieve all with questions

  [These are the tests](https://github.com/brandonsousa/Med365Quiz/blob/main/assets/tests.PNG)


## To Use
[These are the routes](https://github.com/brandonsousa/Med365Quiz/blob/main/assets/routes.PNG) you have in the api, with names, verbs and middleware

import [this file](https://github.com/brandonsousa/Med365Quiz/blob/main/assets/Insomnia_2020-12-15.json) configured in your [insomnia](https://insomnia.rest/)

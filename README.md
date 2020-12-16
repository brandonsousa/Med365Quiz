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
        - Retrieve with question and answer
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
## To Use
These are the routes you have in the api, with names, verbs and middleware
![](./assets/routes.png)

import [this file](./assets/Insomnia_2020-12-15) configured in your [insomnia](https://insomnia.rest/)

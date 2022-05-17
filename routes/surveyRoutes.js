const express = require('express')
const requireLogin = require('../middlewares/requireLogin')
const checkCredits = require('../middlewares/checkCredits')
const surveyController = require('../controllers/surveyController')
const router = express.Router()
// router.use(requireLogin)

router
  .route('/')
  .post(requireLogin, checkCredits, surveyController.createSurvey)
  .get(requireLogin, surveyController.getSurveys)

router
  .route('/:surveyId/:choice')
  .get(surveyController.thankUser)

router
  .route('/webhook')
  .post(surveyController.webHookHandler)

module.exports = router
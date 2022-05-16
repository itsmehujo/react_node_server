const express = require('express')
const requireLogin = require('../middlewares/requireLogin')
const checkCredits = require('../middlewares/checkCredits')
const surveyController = require('../controllers/surveyController')
const router = express.Router()
router.use(requireLogin)

router
  .route('/')
  .post(checkCredits, surveyController.createSurvey)
  .get(surveyController.getSurveys)
router
  .route('/thanks')
  .get(surveyController.thankUser)

module.exports = router
const mongoose = require('mongoose')
const { sendEmailCampaign } = require('../services/Mailer')
const Survey = mongoose.model('surveys')
const surveyTemplate = require('../services/emailTemplates/basicTemplate.js')

exports.createSurvey = async (req, res) => {
  const { title, subject, body, recipients } = req.body
  const survey = await new Survey({
    _user: req.user.id,
    title,
    subject,
    body,
    recipients: recipients.map(recipient => ({ email: recipient })),
    dateSent: Date.now()
  })
  try {
    sendEmailCampaign(survey, surveyTemplate(survey))
    await survey.save()
    req.user.credits -= 1
    const user = req.user.save()
    res.send(user)
  } catch (err) {
    res.status(422).send(err)
  }
}
exports.getSurveys = (req, res) => res.send()
exports.thankUser = (req, res) => res.send("Thank your for giving your feedback :)")
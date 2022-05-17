const mongoose = require('mongoose')
const { URL } = require('url')
const { Path } = require('path-parser')
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
exports.thankUser = (req, res) => res.send("Thank your for giving your feedback :)")

exports.sendTemplate = (req, res) => {
  const survey = req.body
  console.log(survey)
  res.send(surveyTemplate(survey))
}

exports.webHookHandler = (req, res) => {
  const p = new Path('/api/surveys/:surveyId/:choice')
  let events = req.body
  if (!Array.isArray(events)) {
    events = [events]
  }
  events = events.map(({ email, url }) => {
    const match = p.test(new URL(url).pathname)
    if (match) {
      return {
        email,
        choice: match.choice,
        surveyId: match.surveyId
      }
    }
  })
    // get rid of falsy values
    .filter(Boolean)
  // unique values
  const uniqEvents = [...new Set(events)]
  uniqEvents.forEach(({ surveyId, email, choice }) => {
    Survey.updateOne({
      _id: surveyId,
      recipients: {
        $elemMatch: { email: email, responded: false }
      }
    }, {
      $inc: { [choice]: 1 },
      $set: { 'recipients.$.responded': true }
    }).exec()
  })
  res.send(uniqEvents)
}


exports.getSurveys = async (req, res) => {
  const surveys = await Survey.find(
    { _user: req.user.id }
  )
  res.send(surveys)
}

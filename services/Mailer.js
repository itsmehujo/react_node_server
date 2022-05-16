const sgMail = require('@sendgrid/mail')
const keys = require('../config/keys')
sgMail.setApiKey(keys.sendGridKey)

exports.sendEmailCampaign = ({ subject, recipients }, content) => {
  // take the last value out so that everyone is in bcc
  const to = recipients.pop()
  const msg = {
    personalizations: [
      { to, bcc: recipients }
    ],
    from: 'itsmehujo@gmail.com',
    subject,
    html: content
  }
  sgMail.sendMultiple(msg)
  // get the last value in again so that the array is full again, for db
  recipients.push(to)
}

const sgMail = require('@sendgrid/mail')
const keys = require('../config/keys')
sgMail.setApiKey(keys.sendGridKey)

exports.sendEmailCampaign = ({ subject, recipients }, content) => {
  const msg = {
    personalizations: [
      { to: recipients.pop(), bcc: recipients }
    ],
    from: 'itsmehujo@gmail.com',
    subject,
    html: content
  }
  sgMail.sendMultiple(msg)
}

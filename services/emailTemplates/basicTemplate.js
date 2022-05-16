const { redirectDomain } = require('../../config/keys')

module.exports = (survey) => {
  return (`
    <html>
      <body>
        <div style='text-align: center;'>
          <h3>Hello ! I would like a feedback from your experience</h3>
          <p>Please answer the following question: </p>
          <p>${survey.body}</p>
          <div>
            <a href='${redirectDomain}/api/surveys/thanks'>Yes</a>
            <a href='${redirectDomain}/api/surveys/thanks'>No</a>
          </div>
          <p>Thank you for your time !</p>
        </div>
      </body>
    </html>
  `)
}
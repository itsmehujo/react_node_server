import React from 'react'

import './style/surveyCard.scss'

const SurveyCard = ({survey}) => {
  const {dateSent, body, subject, title, recipients, yes, no} = survey
  return(<div className='surveyCard'>
    <h2>{title}</h2>
    <span>{subject}</span>
    <span>Sent on {new Date(dateSent).toLocaleDateString()}</span>
    <hr/>
    <span>People reached: {recipients.length}</span>
    <div>
      <span>Yes : {yes}</span>
      <span>No: {no}</span>
    </div>
  </div>)

}

export default SurveyCard
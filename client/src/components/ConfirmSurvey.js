import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import { Navigate } from 'react-router-dom'
import axios from 'axios'

const ConfirmSurvey = () => {
  const [needToRedirect, setNeedToRedirect] = useState(false)
  const {title, subject, body, recipients} = useSelector(state => state.form)
  const sendForm = async () => {
    const res = await axios.post('/api/surveys', {
      title,
      subject,
      body,
      recipients
     })
     res.status === 200 ? console.log(res) : console.log(res)
  }

  return(<main id='confirm_survey'>
    Confirm Survey please
    <div>
      Title : {title}
    </div>
    <div>
      Email subject: {subject}
    </div>
    <div>
      Email body: {body}
    </div>
    <div>
      Recipients: 
      {recipients.map((recipient, i) => (<div key={i}>{recipient}</div>))}
    </div>
    <div>
      Looks alright ? <button onClick={sendForm}>Send survey !</button>
    </div>
    <div>
    Something's off ? <button onClick={() => setNeedToRedirect(true)}>Change the survey</button>
    </div>
    {needToRedirect ? <Navigate to='/surveys/new'/> : null}
  </main>)
}

export default ConfirmSurvey
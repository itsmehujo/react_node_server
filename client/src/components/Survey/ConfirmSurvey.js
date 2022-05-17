import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import { resetForm } from '../../features/formSlice'

import './style/confirm_survey.scss';

const ConfirmSurvey = () => {
  const {title, subject, body, recipients} = useSelector(state => state.form)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const sendForm = async () => {
    const res = await axios.post('/api/surveys', {
      title,
      subject,
      body,
      recipients
     })
     if(res.status === 200) {
      dispatch(resetForm())
      navigate('/surveys')
     } else {
       alert('Something went wrong...')
     }
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
    <div className='button'>
      Looks alright ? <button onClick={sendForm}>Send survey !</button>
    </div>
    <div className='button'>
    Something's off ? <button onClick={() => navigate('/surveys/new')}>Change the survey</button>
    </div>
  </main>)
}

export default ConfirmSurvey
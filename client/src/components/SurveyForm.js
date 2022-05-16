import React, {useState, useEffect} from 'react'
import '../style/survey_form.scss'
import axios from 'axios'

const SurveyForm = () => {
  const emptyForm = {survey_title: '', subject_line: '', email_body: '', recipients_list: []}
  const [form, setForm] = useState(emptyForm)
  const [recipients, setRecipients] = useState(new Set())
  const [message, setMessage] = useState(null)
  const [errors, setErrors] = useState({})
  const [popup, setPopup] = useState('')

  useEffect(() => {
    setForm(prevForm => ({ ...prevForm, recipients_list: [...recipients] }))
  }, [recipients])

  const handleErrors = () => {
    if(!form.email_body) {
      setErrors(prevErrors => ({...prevErrors, email_body: 'Please provide a body content'}))
    }
    if(!form.subject_line) {
      setErrors(prevErrors => ({...prevErrors, subject_line: 'Please provide a subject line'}))
    }
    if(!form.survey_title) {
      setErrors(prevErrors => ({...prevErrors, survey_title: 'Please provide a survey title'}))
    }
    if(form.recipients_list.length < 1) {
      setErrors(prevErrors => ({...prevErrors, recipients_list: 'Please provide at least one e-mail address'}))
    }
    if(form.email_body && form.subject_line && form.survey_title && form.recipients_list.length > 0) {
      return true
    }
    else {
      return false
    }
  }
  const clearForm = () => {
    setForm(emptyForm)
  }

  const showPopup = (status) => {
    switch (status) {
      case 200:
        setPopup('Your campaign has been sent successfully !')
        clearForm()
        break
      default: 
        setPopup('Something went wrong...')
    }
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    const noErrors = handleErrors()
    if(noErrors) {
      const res = await axios.post('/api/surveys', {
        title: form.survey_title, 
        subject: form.subject_line, 
        body: form.email_body, 
        recipients: form.recipients_list
      })
        showPopup(res.status)
  }
}
  const handleChange = (e) => {
    setForm(prevForm => ({...prevForm,[e.target.className]: e.target.value}))
    setErrors(prevErrors => ({...prevErrors, [e.target.className]: null}))
  }
  const addRecipient = (e) => {
    const emailReg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
    if(e.key === 'Enter') {
      e.preventDefault()
      if(e.target.value.match(emailReg)) {
        setRecipients(prevRecipients => (new Set([...prevRecipients, e.target.value])))
        setErrors(prevErrors => ({...prevErrors, [e.target.className]: null}))
      }
      else {
        setMessage('Please provide a valid e-mail address')
      }

    }
  }
  const removeRecipient = (e) => {
    setRecipients(prevRecipients => (new Set([...prevRecipients].filter(prevRecipient => prevRecipient !== e.target.innerText))))
  }

  return(<div
    id="survey_form">
      {popup ? <div id='popup'>{popup}</div> : null}
      <h2>Create a new survey !</h2>
    <form
    onSubmit={handleFormSubmit}>
      <label>
        Survey Title
        <input type='text'
        value={form.survey_title}
        onChange={handleChange}
        className='survey_title'/>
      {errors.survey_title ? (<span className='error'>{errors.survey_title}</span>) : null}
      </label>
      <label>
        Subject line
        <input type='text'
        onChange={handleChange}
        value={form.subject_line}
        className='subject_line'/>
      {errors.subject_line ? (<span className='error'>{errors.subject_line}</span>) : null}
      </label>
      <label>
        Email Body
        <textarea
        className='email_body'
        value={form.email_body}
        onChange={handleChange}
        ></textarea>
      {errors.email_body ? (<span className='error'>{errors.email_body}</span>) : null}
      </label>
      <label>
        Recipient List, enter to add
          <div className='recipients'>
            {[...recipients].map((recipient, i) => (
            <span className='recipient'
            key={i}
            onClick={removeRecipient}>
              {recipient}
              </span>)
            )}
          </div>
          <input type='text'
          className='recipients_list'
          onKeyDown={addRecipient}/>
          {message ? (<span className='error'>{message}</span>) : null}
          {errors.recipients_list ? (<span className='error'>{errors.recipients_list}</span>): null}
      </label>
      <button
      type='submit'
      >Submit !</button>
    </form>
  </div>)
}

export default SurveyForm
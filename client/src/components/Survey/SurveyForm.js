import React from 'react'
import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {Formik, Form, Field, FieldArray, ErrorMessage} from 'formik'

import { updateForm } from '../../features/formSlice'

import './style/survey_form.scss'

const validate = ({title, subject, body, recipients}) => {
  const errors = {};
  if (!title) {
    errors.title = 'Required';
  }

  if (!subject) {
    errors.subject = 'Required';
  } 

  if (!body) {
    errors.body = 'Required';
  }

  if(recipients.length < 1) {
    errors.recipients = 'Required'
  }
  return errors;
};

const SurveyForm = () => {
  const {title, subject, body, recipients} = useSelector(state => state.form)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const checkEmail = (email) => {
    return email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)
  }

  const addRecipient = (e, {form}) => {
    if(e.key === 'Enter') {
      if(form.values.new_recipient) {
        // We check that the email is correct
        if(checkEmail(form.values.new_recipient)) {
          // we add the email to the recipients list via a new Set, ensuring that all the emails are unique
          // we clear the new_recipient value
          form.setValues(
            {
              ...form.values,
              recipients: [...new Set([...form.values.recipients, form.values.new_recipient])],
              new_recipient: ''
            })
          } else {
            form.setErrors({...form.errors, new_recipient:'Please provide a valid e-mail' })
          }
        } else {
          form.submitForm()
        }
      } 
  }
  
  return(<div
    id="survey_form">
      <h2>Create a new survey !</h2>
      <Formik
       initialValues={{ title, subject, body, recipients, new_recipient: '' }}
       validate={validate}
       onSubmit={async ({title, subject, body, recipients}, form) => {
        dispatch(updateForm({
          title,
          subject,
          body,
          recipients
        }))
        form.setSubmitting(false)
        form.resetForm()
        navigate('/surveys/new/confirm')
       }}       
     >
       {({values, isSubmitting, validateForm}) => (
         <Form
         onKeyDown={(e) => {
           if(e.key === 'Enter'){ e.preventDefault() }}}
          >
           <label>Survey Title
            <Field type="text" name="title" />
            <ErrorMessage name="title" component="div" className='error'/>
          </label>
          <label>
            Subject
           <Field type="text" name="subject" />
           <ErrorMessage name="subject" component="div"  className='error'/>
           </label>
           <label>
             Email body
            <Field name='body' as='textarea'/>
            <ErrorMessage name="body" component="div"  className='error'/>
           </label>
           <label>
             Recipients (enter to add one)
             <FieldArray
             name='recipients'
             render={arrayHelpers => (<>
              <div className='recipients'>
              {values.recipients.map((recipient, i) => (
              <span className='recipient'
              key={i}
              onClick={() => arrayHelpers.remove(i)}>
                {recipient}
                </span>)
              )}
            </div>
            <Field name='new_recipient'
            onKeyDown={(e) => {
             addRecipient(e, arrayHelpers)
            }}/>
            </>
             )}
             />
            <ErrorMessage name="recipients" component="div"  className='error'/>
            <ErrorMessage name="new_recipient" component="div"  className='error'/>
           </label>
           <div className='buttons'>
            <button type='button' onClick={() => {
              const {title, subject, body, recipients} = values
              dispatch(updateForm({title,subject,body,recipients}))
              }}>Save</button>
            <button type="submit" disabled={isSubmitting}>
              Next step
            </button>
          </div>
         </Form>
       )}
     </Formik>   
  </div>)
}

export default SurveyForm
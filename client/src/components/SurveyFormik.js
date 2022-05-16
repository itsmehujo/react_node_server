import React from 'react'
import {Formik, Form, Field, FieldArray, ErrorMessage} from 'formik'
import '../style/survey_form.scss'
import axios from 'axios'

const validate = values => {
  const errors = {};
  if (!values.survey_title) {
    errors.survey_title = 'Required';
  }

  if (!values.subject_line) {
    errors.subject_line = 'Required';
  } 

  if (!values.email_body) {
    errors.email_body = 'Required';
  }

  if(values.recipients_list.length < 1) {
    errors.recipients_list = 'Required'
  }
  return errors;
};

const SurveyForm = () => {
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
              recipients_list: [...new Set([...form.values.recipients_list, form.values.new_recipient])],
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
       initialValues={{ survey_title: '', subject_line: '', email_body: '', recipients_list: [], new_recipient: '' }}
       validate={validate}
       onSubmit={async (values, { setSubmitting }) => {
        console.log('submitting')
         const res = await axios.post('/api/surveys', {
          title: values.survey_title,
          subject: values.subject_line,
          body: values.email_body,
          recipients: values.recipients_list
         })
         res.status === 200 ? console.log(res) : console.log(res)
          setSubmitting(false);
       }}
     >
       {({values, isSubmitting}) => (
         <Form
         onKeyDown={(e) => {
           if(e.key === 'Enter'){ e.preventDefault() }}}
          >
           <button
           onClick={() => console.log(values)}
           type='button'
           >Show values</button>
           <label>Survey Title
            <Field type="text" name="survey_title" />
            <ErrorMessage name="survey_title" component="div" className='error'/>
          </label>
          <label>
            Subject
           <Field type="text" name="subject_line" />
           <ErrorMessage name="subject_line" component="div"  className='error'/>
           </label>
           <label>
             Email body
            <Field name='email_body' as='textarea'/>
            <ErrorMessage name="email_body" component="div"  className='error'/>
           </label>
           <label>
             Recipients (enter to add one)
             <FieldArray
             name='recipients_list'
             render={arrayHelpers => (<>
              <div className='recipients'>
              {values.recipients_list.map((recipient, i) => (
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
            <ErrorMessage name="recipients_list" component="div"  className='error'/>
            <ErrorMessage name="new_recipient" component="div"  className='error'/>
           </label>
           <button type="submit" disabled={isSubmitting}>
             Submit
           </button>
         </Form>
       )}
     </Formik>   
  </div>)
}

export default SurveyForm
import React from 'react'
import {useSelector} from 'react-redux'

import SurveyCard from './SurveyCard'


const DashboardView = () => {
  const surveys = useSelector(state => state.surveys)
  return(
  <div className='surveysView' style={{width: '100%'}}>
    {surveys ? surveys.map(survey => <SurveyCard key={survey._id} survey={survey}/>) : 'No survey yet ! Add some credits to start gaining insight !'}
    </div>
    )
}

export default DashboardView
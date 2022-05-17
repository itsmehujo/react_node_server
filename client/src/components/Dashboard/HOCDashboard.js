import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import DashboardNav from './DashboardNav'

import './style/dashboard.scss'
import { fetchSurveys } from '../../features'

const HOCDashboard = (props) => {
  const profile = useSelector(state => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if(!profile) {
      navigate('/')
    } else {
      dispatch(fetchSurveys())
    }
  }, [profile])


  return(<main id='dashboard'>
    { props.showNav ? <DashboardNav/> : null}
    {props.children ? props.children : null}
    </main>)
}
export default HOCDashboard
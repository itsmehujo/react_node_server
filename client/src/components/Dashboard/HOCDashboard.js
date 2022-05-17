import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import DashboardNav from './DashboardNav'

import './style/dashboard.scss'

const HOCDashboard = (props) => {
  const profile = useSelector(state => state.auth)
  const navigate = useNavigate()

  useEffect(() => {
    if(!profile) {
      navigate('/')
    }
  }, [profile])


  return(<main id='dashboard'>
    { props.showNav ? <DashboardNav/> : null}
    {props.children ? props.children : null}
    </main>)
}
export default HOCDashboard
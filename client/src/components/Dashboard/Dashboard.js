import React from 'react'

import DashboardNav from './DashboardNav'

import './style/dashboard.scss'

const Dashboard = (props) => {
  return(<main id='dashboard'>
    { props.showNav ? <DashboardNav/> : null}
    {props.children ? props.children : null}
    </main>)
}
export default Dashboard
import React from 'react'
import { NavLink } from 'react-router-dom'

const DashboardNav = () => {
  return(
    <nav>
      <NavLink end to='/surveys'>Dashboard</NavLink>
      <NavLink to='/surveys/new'>New survey</NavLink>
    </nav>    
  )
}

export default DashboardNav
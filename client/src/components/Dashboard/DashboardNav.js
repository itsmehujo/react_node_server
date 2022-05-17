import React from 'react'
import { NavLink } from 'react-router-dom'

const DashboardNav = () => {
  return(
    <nav>
      <ul>
        <li>
         <NavLink end to='/surveys'>Dashboard</NavLink>
        </li>
        <li>
          <NavLink to='/surveys/new'>New survey</NavLink>
        </li>
      </ul>
    </nav>    
  )
}

export default DashboardNav
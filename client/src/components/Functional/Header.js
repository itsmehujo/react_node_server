import React, {useState, useEffect} from 'react'
import {NavLink} from 'react-router-dom'
import {useSelector} from 'react-redux'

import './style/header.scss'


const Header = () => {
  const auth = useSelector(store => store.auth)
  const [profile, setProfile] = useState({})

  useEffect(() => {
    setProfile(auth)
  }, [auth])

  const renderContent = () => {
    switch(profile) {
      case null:
        return
      case false:
        return (
          <li><a href='/api/auth/google'>Log in with Google</a></li>
        )
      default: 
        return (<>
        <span>{profile.credits} credits</span>
        <NavLink 
        className={'button'}
        to='/choose_tokens'>Add credits</NavLink>
        <li><a href='/api/user/logout'>Logout</a></li>
        </>)
    }
  }

  return ( 
    <header id='main-header'>
      <NavLink 
      to={profile ? '/surveys' : '/'} 
      className={'logo'}
        >itsfeedback</NavLink>
    <nav>
        <ul>
          {renderContent()}
        </ul>
    </nav>
  </header>
  )
}


export default Header


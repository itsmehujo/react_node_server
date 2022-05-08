import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'

class Header extends Component {
  render () {
    return(
    <header>
    <nav>
      <div className='nav-wrapper'>
        <NavLink to='/'
        style={{paddingLeft: '2%', textTransform: 'uppercase', fontWeight: 'bold', fontSize: '1.5em'}}
        >itsmehujo</NavLink>
        <ul className='right'>
          <li>
            <a
              href={'/auth/google'}
              >Log in with Google</a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
  )}
}

export default Header;


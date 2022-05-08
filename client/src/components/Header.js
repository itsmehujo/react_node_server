import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'


class Header extends Component {

  renderContent() {
    switch(this.props.auth) {
      case null:
        return
      case false:
        return (
          <li><a href='/auth/google'>Log in with Google</a></li>
        )
      default: 
        return (
        <li><a href='/api/logout'>Logout</a></li>
        )
    }
  }

  render () {
    return(
    <header>
    <nav>
      <div className='nav-wrapper'>
        <NavLink to='/'
        style={{paddingLeft: '2%', textTransform: 'uppercase', fontWeight: 'bold', fontSize: '1.5em'}}
        >itsmehujo</NavLink>
        <ul className='right'>
          {this.renderContent()}
        </ul>
      </div>
    </nav>
  </header>
  )}
}

const mapStateToProps = ({auth}) => ({
  auth
})

export default connect(mapStateToProps)(Header);


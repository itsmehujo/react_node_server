import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import '../style/header.scss'


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
    <header id='main-header'>
      <NavLink 
      to={this.props.auth ? '/surveys' : '/'} 
      className={'logo'}
        >itsfeedback</NavLink>
    <nav>
        <ul>
          {this.renderContent()}
          <NavLink to='/checkout'>Checkout</NavLink>
        </ul>
    </nav>
  </header>
  )}
}

const mapStateToProps = ({auth}) => ({
  auth
})

export default connect(mapStateToProps)(Header);


import React from 'react'
import { Link } from 'react-router-dom'
import auth from '../lib/auth'
import { withRouter } from 'react-router-dom'

class NavBar extends React.Component {

  constructor() {
    super()
    this.state = {
      navMobileOpen: false
    }
  }

  HandleLogout() {
    auth.logOut()
    this.props.history.push('/')
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.setState({ navMobileOpen: false })
    }
  }

  render() {
    const isLoggedIn = auth.isLoggedIn()

    return <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a
          role="button"
          className={`navbar-burger burger is-transparent ${this.state.navMobileOpen ? 'is-active' : ''}`}
          aria-label="menu"
          aria-expanded="false"
          onClick={() => this.setState({ navMobileOpen: !this.state.navMobileOpen })}>

          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div className={`navbar-menu ${this.state.navMobileOpen ? 'is-active' : ''}`}>
        {isLoggedIn && <div className="navbar-item">
          <Link to="/profile">
            Profile
          </Link>
        </div>}
        {isLoggedIn && <div className="navbar-item">
          <Link to="/searchlocation">
            Add Location
          </Link>
        </div>}
        {!isLoggedIn && <div className="navbar-item">
          <Link to="/register">Register</Link>
        </div>}
        {!isLoggedIn && <div className="navbar-item">
          <Link to="/login">Login</Link>
        </div>}
        {isLoggedIn && <div
          className="navbar-item"

          onClick={() => this.HandleLogout()}
        >
          <Link to="/">Log out</Link>

        </div>}
      </div>
    </nav>
  }
}
export default withRouter(NavBar)
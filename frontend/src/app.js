import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Switch, Route } from 'react-router-dom'
import Login from './components/Login'
import WelcomePage from './components/WelcomePage'
import 'bulma'
import './style.scss'
import Register from './components/Register'
import Profile from './components/Profile'
import Navbar from './components/Navbar'
import SearchLocation from './components/SearchLocation'


const App = () => {
  return <HashRouter>
    <Navbar />
    <Switch>
      <Route exact path="/searchlocation" component={SearchLocation} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/" component={WelcomePage} />
    </Switch>
  </HashRouter>
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
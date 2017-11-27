import React from 'react'
import { Router, Switch, Route } from 'react-router-dom'
import history from './history'
import Auth from './auth'

import Home from './pages/home'
import Login from './pages/login'
import Callback from './pages/callback'
import Protected from './pages/protected'

const auth = Auth()

const App = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route
          exact
          path="/"
          component={props => {
            return (
              <Home
                isAuthenticated={auth.isAuthenticated}
                logout={auth.logout}
                {...props}
              />
            )
          }}
        />
        <Route
          path="/login"
          component={props => {
            return <Login login={auth.login} {...props} />
          }}
        />
        <Route
          path="/callback"
          component={props => {
            return (
              <Callback handleAuth={auth.handleAuthentication} {...props} />
            )
          }}
        />
        <Route
          path="/protected"
          component={props => {
            if (auth.isAuthenticated()) {
              return <Protected {...props} />
            } else {
              return <h1>Access Denied</h1>
            }
          }}
        />
      </Switch>
    </Router>
  )
}

export default App

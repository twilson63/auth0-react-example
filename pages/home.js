import React from 'react'
import { Link } from 'react-router-dom'

const Home = props => {
  return (
    <div>
      <h1>Home Page</h1>
      <nav>{!props.isAuthenticated() && <Link to="/login">Login</Link>}</nav>
      {props.isAuthenticated() && (
        <div>
          <h1>Welcome!</h1>
          <button onClick={e => props.logout()}>Logout</button>
        </div>
      )}
    </div>
  )
}

export default Home

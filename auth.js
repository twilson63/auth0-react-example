import auth0 from 'auth0-js'
import history from './history'

export default () => {
  const auth = new auth0.WebAuth({
    domain: 'twilson63.auth0.com',
    clientID: 'Md9dDbtYtwPTApEw0LP5WKZbTzgGdbyS',
    redirectUri: 'http://localhost:4000/callback',
    audience: 'https://twilson63.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid'
  })

  return {
    login,
    logout,
    isAuthenticated,
    handleAuthentication
  }

  function handleAuthentication() {
    console.log('Handle Auth')
    auth.parseHash((err, authResult) => {
      console.log(authResult)
      if (authResult && authResult.accessToken && authResult.idToken) {
        setSession(authResult)
        history.replace('/')
      } else if (err) {
        history.replace('/')
        console.log(err)
      }
    })
  }

  function setSession(authResult) {
    let expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    )
    localStorage.setItem('access_token', authResult.accessToken)
    localStorage.setItem('id_token', authResult.idToken)
    localStorage.setItem('expires_at', expiresAt)
    // navigate to the home route
    history.replace('/')
  }

  function isAuthenticated() {
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'))
    return new Date().getTime() < expiresAt
  }

  function logout() {
    window.localStorage.removeItem('access_token')
    window.localStorage.removeItem('id_token')
    window.localStorage.removeItem('expires_at')
    history.replace('/')
  }

  function login() {
    auth.authorize()
  }
}

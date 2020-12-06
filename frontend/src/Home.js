/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './Login'

const Home = () => {
  const [login, setLogin] = useState(false)
  const [username, setUsername] = useState('')

  // function for logout
  const logout = async () => {
    try {
      await axios.post('/account/logout')
      // go back to home when click signup
      setLogin(false)
    } catch (e) {
      // eslint-disable-next-line no-alert
      window.alert('Error trying to logout')
    }
  }

  useEffect(() => {
    const intervalID = setInterval(() => {
      axios.get('/account/isloggedin').then(response => {
        setLogin(response.data)
      })
    }, 50)
    // return a clean-up function so that the repetition can be stopped
    // when the component is unmounted
    return () => clearInterval(intervalID)
  }, [])

  useEffect(() => {
    if (login) {
      axios.get('/account/getusername').then(response => {
        // console.log(response);
        setUsername(response.data)
      })
    }
  })

  return (
    <div>
      {!login && <Login />}
      {login && (
        <div>
          <h2 style={{ display: 'flex', justifyContent: 'center' }}>
            Welcome:
            {' '}
            {username}
            <button
              type="button"
              className="btn btn-outline-primary"
              style={{ marginLeft: '20px' }}
              onClick={() => logout()}
            >
              Logout
            </button>
          </h2>

          <a
            href="create"
            className="btn btn-primary btn-lg btn-block"
            role="button"
            aria-pressed="true"
          >
            Create Quiz
          </a>
          <a
            href="search"
            className="btn btn-primary btn-lg btn-block"
            role="button"
            aria-pressed="true"
          >
            Take Quiz
          </a>
        </div>
      )}
    </div>
  )
}

export default Home

/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react'
import axios from 'axios'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'

const Signup = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')
  const history = useHistory()

  const signup = async () => {
    try {
      await axios.post('/account/signup', { username, password })
      setMsg('sign up is successful')
      // go back to home when click signup
      history.push('/')
    } catch (e) {
      // console.log(e)
      // eslint-disable-next-line no-alert
      window.alert('Error trying to signup')
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div>
        <h3>Signup</h3>
        <h4>Username:</h4>
        <input onChange={e => setUsername(e.target.value)} />
        <br />
        <h4>Password:</h4>
        <input onChange={e => setPassword(e.target.value)} />
        <br />
        <Button
          style={{ marginTop: '10px' }}
          onClick={() => signup(username, password, setMsg)}
        >
          Signup
        </Button>
        {msg}
        <br />
        Already have an account?
        <Link to="/login">Login Here!</Link>
      </div>
    </div>
  )
}

export default Signup

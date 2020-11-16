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

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')
  const history = useHistory()

  const login = async () => {
    try {
      await axios.post('/account/login', { username, password })
      setMsg('login is successful')
      // go back to home when click signup
      history.push('/')
    } catch (e) {
      // eslint-disable-next-line no-alert
      window.alert('Error trying to login')
    }
  }

  return (
    <>
      <h2>Login</h2>
      <h4>Username:</h4>
      <input onChange={e => setUsername(e.target.value)} />
      <br />
      <h4>Password:</h4>
      <input onChange={e => setPassword(e.target.value)} />
      <br />
      <Button onClick={() => login(username, password, setMsg)}>Login</Button>
      {msg}
      <br />
      Need an account?
      <Link to="/signup">Signup Here!</Link>
    </>
  )
}

export default Login

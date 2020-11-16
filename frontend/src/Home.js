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
import AddQuestion from './AddQuestion'
import LoginQuestion from './LoginQuestion'
import 'bootstrap/dist/css/bootstrap.min.css'

// eslint-disable-next-line react/prop-types
const Question = ({ questionText, author, answer }) => (
  <div
    style={{
      backgroundColor: 'lightblue',
      width: '300px',
      border: '8px solid blue',
      padding: '10px',
      margin: '10px',
    }}
  >
    <h3>{questionText}</h3>
    <h5>
      Author:
      {author}
    </h5>
    <h5>Answer:</h5>
    <h6>{answer}</h6>
    <br />
  </div>
)

const Home = () => {
  const [questions, setQuestions] = useState([])
  const [login, setLogin] = useState(false)
  const [username, setUsername] = useState('')
  const history = useHistory()

  useEffect(() => {
    const intervalID = setInterval(() => {
      axios.get('/api/questions').then(response => {
        // console.log(response);
        setQuestions(response.data)
      })
    }, 2000)
    // return a clean-up function so that the repetition can be stopped
    // when the component is unmounted
    return () => clearInterval(intervalID)
  }, [])

  // function for logout
  const logout = async () => {
    try {
      await axios.post('/account/logout')
      // go back to home when click signup
      history.push('/')
    } catch (e) {
      // eslint-disable-next-line no-alert
      window.alert('Error trying to logout')
    }
  }

  // to tell us if we are logged in and to update the username if we are
  useEffect(() => {
    axios.get('/account/isloggedin').then(response => {
      // console.log(response);
      setLogin(response.data)
      // console.log(response.data)
    })
    if (login) {
      axios.get('/account/getusername').then(response => {
        // console.log(response);
        setUsername(response.data)
      })
    }
  })

  return (
    <>
      {login && (
        <div>
          Hi
          {' '}
          {username}
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => logout()}
          >
            Logout
          </button>
          <br />
          <AddQuestion author={username} />
          {questions.map(({
            questionText, author, answer, _id,
          }) => (
            <LoginQuestion
              key={_id}
              questionText={questionText}
              author={author}
              answer={answer}
              _id={_id}
            />
          ))}
        </div>
      )}

      {!login && (
        <div>
          <Link to="/login">Log in to Submit a Question</Link>
          {questions.map(({
            questionText, author, answer, _id,
          }) => (
            <Question
              key={_id}
              questionText={questionText}
              author={author}
              answer={answer}
            />
          ))}
        </div>
      )}
    </>
  )
}

export default Home

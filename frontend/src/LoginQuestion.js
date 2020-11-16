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
import 'bootstrap/dist/css/bootstrap.min.css'

const LoginQuestion = ({
  // eslint-disable-next-line react/prop-types
  questionText, author, answer, _id,
}) => {
  const [answerInput, setAnswer] = useState('')

  // answer the question
  const add = async () => {
    try {
      await axios.post('/api/questions/answer', { _id, answer: answerInput })
    } catch (e) {
      // eslint-disable-next-line no-alert
      window.alert('Error trying to answer a question')
    }
  }

  return (
    <>
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
        <h5>Answer Question:</h5>
        <input onChange={e => setAnswer(e.target.value)} />
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={() => add(_id, answer)}
        >
          Answer
        </button>
      </div>
    </>
  )
}

export default LoginQuestion

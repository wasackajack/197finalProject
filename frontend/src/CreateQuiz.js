/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from 'react-router-dom'

const CreateQuiz = ({ author }) => {
  const [questions, setQuestions] = useState([])
  const [choices, setChoices] = useState([])
  const [answers, setAnswers] = useState([])
  const [title, setTitle] = useState('')
  const history = useHistory()
  // variables for current question and answers
  const [currQ, setCurrQ] = useState('')
  const [currA1, setCurrA1] = useState('')
  const [currA2, setCurrA2] = useState('')
  const [currA3, setCurrA3] = useState('')
  const [currA4, setCurrA4] = useState('')
  const [currAnswer, setCurrAnswer] = useState('')

  const addQuestion = () => {
    setQuestions(questions.concat(currQ))
    setChoices(choices.concat([[currA1, currA2, currA3, currA4]]))
    setAnswers(answers.concat(currAnswer))
    setCurrQ('')
    setCurrA1('')
    setCurrA2('')
    setCurrA3('')
    setCurrA4('')
    setCurrAnswer('')
  }

  // function to create quiz
  const create = async () => {
    try {
      await axios.post('/api/quiz/add', {
        title,
        author,
        questions,
        choices,
        answers,
      })
      history.push('/')
    } catch (e) {
      // eslint-disable-next-line no-alert
      window.alert('Error trying to create quiz')
    }
  }

  const cancel = async () => {
    try {
      history.push('/')
    } catch (e) {
      // eslint-disable-next-line no-alert
      window.alert('Error canceling')
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div>
        <h2>Create Quiz</h2>
        <h4>Title:</h4>
        <input
          className="form-control form-control-sm mr-3 w-75"
          onChange={e => setTitle(e.target.value)}
        />
        <br />

        <button
          type="button"
          className="btn btn-outline-success"
          data-toggle="modal"
          data-target="#exampleModal"
        >
          Add Question
        </button>

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Add Question
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <h4>Question:</h4>
                <input
                  className="form-control form-control-sm mr-3 w-75"
                  onChange={e => setCurrQ(e.target.value)}
                />
                <h4>Choice 1:</h4>
                <input
                  className="form-control form-control-sm mr-3 w-75"
                  onChange={e => setCurrA1(e.target.value)}
                />
                <h4>Choice 2:</h4>
                <input
                  className="form-control form-control-sm mr-3 w-75"
                  onChange={e => setCurrA2(e.target.value)}
                />
                <h4>Choice 3:</h4>
                <input
                  className="form-control form-control-sm mr-3 w-75"
                  onChange={e => setCurrA3(e.target.value)}
                />
                <h4>Choice 4:</h4>
                <input
                  className="form-control form-control-sm mr-3 w-75"
                  onChange={e => setCurrA4(e.target.value)}
                />
                <h4>Correct Answer (1,2,3 or 4):</h4>
                <input
                  className="form-control form-control-sm mr-3 w-75"
                  onChange={e => setCurrAnswer(e.target.value)}
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={() => setCurrQ('')}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-dismiss="modal"
                  onClick={addQuestion}
                >
                  Add Question
                </button>
              </div>
            </div>
          </div>
        </div>
        <br />

        <Button style={{ marginTop: '10px' }} onClick={create}>
          Create Quiz
        </Button>
        <Button
          style={{ marginTop: '10px', marginLeft: '20px' }}
          onClick={cancel}
        >
          Cancel
        </Button>
      </div>
    </div>
  )
}

export default CreateQuiz

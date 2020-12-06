/* eslint-disable linebreak-style */
/* eslint-disable no-return-assign */
/* eslint-disable react/jsx-filename-extension */
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
import QuizStats from './QuizStats'

// eslint-disable-next-line react/prop-types
const Quiz = ({ _id }) => {
  const [quiz, setQuiz] = useState()
  const [score, setScore] = useState(0)
  const [submit, setSubmit] = useState(false)
  const history = useHistory()

  useEffect(() => {
    axios
      .get('/api/quizzes')
      .then(response => {
        setQuiz(
          // eslint-disable-next-line no-undef
          $.grep(response.data, e => e._id === _id)[0],
        )
      })
      .catch(err => {
        // console.log(err)
      })
  }, [])

  // for adding score to quiz
  const add = async () => {
    try {
      await axios.post('/api/quiz/addscore', {
        _id,
        score: Math.max(0, score),
      })
    } catch (e) {
      // eslint-disable-next-line no-alert
      window.alert('Error trying to add a score')
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

  // for submitting quiz
  const submitQuiz = () => {
    add(_id, score)
    setSubmit(true)
  }

  const scoreFreqs = (scores, options) => {
    const count = {}
    scores.forEach(s => (count[s] = (count[s] || 0) + 1))
    const init = Array.from(Array(options.length), () => 0)
    init.forEach((e, index) => (init[index] = count[index]))
    return init
  }

  return (
    <div>
      {!submit && (
        <div>
          <h1 style={{ display: 'flex', justifyContent: 'center' }}>
            {quiz && quiz.title}
          </h1>
          <h4 style={{ display: 'flex', justifyContent: 'center' }}>
            {'By:'}
            {quiz && quiz.author}
          </h4>
          <br />
          {quiz
            && quiz.questions.map((q, index) => (
              // <Question question={q} choices={quiz.choices[index]} />

              <div>
                <h3 style={{ display: 'flex', justifyContent: 'center' }}>
                  {q}
                  {'?'}
                </h3>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  {quiz.choices[index].map((choice, choiceIndex) => (
                    <Button
                      style={{ margin: '5px' }}
                      onClick={e => {
                        // right
                        if (
                          quiz.answers[index] - 1 === choiceIndex
                          && e.target.style.backgroundColor !== 'red'
                        ) {
                          setScore(score + 1)
                        }
                        if (
                          quiz.answers[index] - 1 === choiceIndex
                          && e.target.style.backgroundColor === 'red'
                        ) {
                          setScore(score - 1)
                        }
                        // wrong
                        if (
                          quiz.answers[index] - 1 !== choiceIndex
                          && e.target.style.backgroundColor !== 'red'
                        ) {
                          setScore(score - 1)
                        }
                        if (
                          quiz.answers[index] - 1 !== choiceIndex
                          && e.target.style.backgroundColor === 'red'
                        ) {
                          setScore(score + 1)
                        }
                        if (e.target.style.backgroundColor !== 'red') {
                          e.target.style.backgroundColor = 'red'
                        } else {
                          e.target.style.backgroundColor = ''
                        }
                      }}
                    >
                      {choice}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          {score}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button
              type="button"
              className="btn btn-secondary btn-lg"
              onClick={submitQuiz}
            >
              Submit Quiz
            </button>
          </div>
          <br />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button
              type="button"
              className="btn btn-outline-success"
              onClick={cancel}
            >
              Back to Home
            </button>
          </div>
        </div>
      )}
      {submit && quiz && (
        <QuizStats
          labels={Array.from(Array(quiz.questions.length + 1).keys())}
          data={scoreFreqs(
            quiz.scores.concat(Math.max(0, score)),
            Array.from(Array(quiz.questions.length + 1).keys()),
          )}
          score={Math.max(0, score)}
          total={quiz.questions.length}
          average={(
            quiz.scores.concat(Math.max(0, score)).reduce((a, b) => a + b)
            / (quiz.scores.length + 1)
          ).toFixed(2)}
        />
      )}
    </div>
  )
}
export default Quiz

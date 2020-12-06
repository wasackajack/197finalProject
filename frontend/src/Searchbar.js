/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from 'react-router-dom'

const Searchbar = () => {
  const [input, setInput] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [quizzes, setQuizzes] = useState([])
  const history = useHistory()

  useEffect(() => {
    const intervalID = setInterval(() => {
      axios.get('/api/quizzes').then(response => {
        // console.log(response);
        setQuizzes(response.data)
      })
    }, 2000)
    // return a clean-up function so that the repetition can be stopped
    // when the component is unmounted
    return () => clearInterval(intervalID)
  }, [])

  useEffect(() => {
    const results = quizzes.filter(quiz => quiz.title.toLowerCase().includes(input))
    setSearchResults(results)
  }, [input])

  const cancel = async () => {
    try {
      history.push('/')
    } catch (e) {
      // eslint-disable-next-line no-alert
      window.alert('Error canceling')
    }
  }

  return (
    <div>
      <form className="form-inline d-flex justify-content-center md-form form-sm active-cyan-2 mt-2">
        <input
          className="form-control form-control-sm mr-3 w-75"
          type="text"
          placeholder="Search"
          aria-label="Search"
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <i className="fas fa-search" aria-hidden="true" />
      </form>

      <div className="list-group">
        {searchResults.map(quiz => (
          <a href={quiz._id} className="list-group-item list-group-item-action" style={{ width: '75%', marginLeft: '230px' }}>
            {quiz.title}
          </a>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button
          type="button"
          className="btn btn-outline-success"
          onClick={cancel}
          style={{ margin: '10px' }}
        >
          Back to Home
        </button>
      </div>
    </div>
  )
}

export default Searchbar

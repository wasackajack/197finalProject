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

// eslint-disable-next-line react/prop-types
const AddQuestion = ({ author }) => {
  const [question, setQuestion] = useState('')
  const history = useHistory()
  // const [adding, setAdding] = useState(false);

  const add = async () => {
    try {
      await axios.post('/api/questions/add', {
        questionText: question,
        author,
      })
      history.push('/')
    } catch (e) {
      // eslint-disable-next-line no-alert
      window.alert('Error trying to add a question')
    }
  }

  const modalClick = () => {
    add(question, author)
    setQuestion('')
  }

  return (
    <>
      <br />
      <button
        type="button"
        className="btn btn-primary"
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
              <input onChange={e => setQuestion(e.target.value)} />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={() => setQuestion('')}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
                onClick={() => modalClick(question, author)}
              >
                Add Question
              </button>
            </div>
          </div>
        </div>
      </div>
      <br />
    </>
  )
}

export default AddQuestion

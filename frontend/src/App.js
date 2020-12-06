/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from 'react-router-dom'
import axios from 'axios'
import Signup from './Signup'
import Login from './Login'
// import Home from "./oldstuff/Home";
import Searchbar from './Searchbar'
import Quiz from './Quiz'
import CreateQuiz from './CreateQuiz'
import QuizStats from './QuizStats'
import Home from './Home'

const App = () => {
  const [login, setLogin] = useState(false)
  const [username, setUsername] = useState('')

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
    <div>
      <h1
        style={{
          display: 'flex',
          justifyContent: 'center',
          font: 'italic bold 60px Georgia,serif',
        }}
      >
        Quiz
        <img
          src="http://www.clipartbest.com/cliparts/4cb/6Lj/4cb6Ljkei.jpg"
          height="90"
          width="90"
          alt=""
        />
        box
      </h1>
      <Router>
        <div>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/search">
              <Searchbar />
            </Route>
            <Route path="/chart">
              <QuizStats
                labels={[0, 1, 2, 3, 4]}
                data={[3, 4, 5, 7, 6]}
                score={5}
                total={8}
                average={5.5}
              />
            </Route>
            <Route path="/create">
              <CreateQuiz author={username} />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/">
              <Quiz _id={window.location.pathname.substr(1)} />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  )
}

export default App

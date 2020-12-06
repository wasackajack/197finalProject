/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react'
import { Bar } from 'react-chartjs-2'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from 'react-router-dom'

const QuizStats = ({
  // eslint-disable-next-line react/prop-types
  labels, data, score, total, average,
}) => {
  const history = useHistory()
  const cancel = async () => {
    try {
      history.push('/')
    } catch (e) {
      // eslint-disable-next-line no-alert
      window.alert('Error canceling')
    }
  }

  return (
    <div className="container">
      <h1 style={{ display: 'flex', justifyContent: 'center' }}>
        Your Score:
        {' '}
        {score}
        {'/'}
        {total}
      </h1>
      <h3 style={{ display: 'flex', justifyContent: 'center' }}>
        Average Score:
        {' '}
        {average}
        {'/'}
        {total}
      </h3>
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
      <div className="row">
        <div className="col">
          <div
            className="chart-container"
            style={{ height: '25vh', width: '50vw' }}
          >
            <Bar
              data={{
                labels: labels || [0],
                datasets: [
                  {
                    label: '',
                    backgroundColor: 'rgba(75,192,192,1)',
                    borderColor: 'rgba(0,0,0,1)',
                    borderWidth: 2,
                    data: data || [0],
                  },
                ],
              }}
              options={{
                title: {
                  display: false,
                  text: 'Scores',
                  fontSize: 20,
                },
                scales: {
                  yAxes: [
                    {
                      ticks: {
                        suggestedMin: 0,
                      },
                      scaleLabel: {
                        display: true,
                        labelString: 'Count',
                        fontSize: 18,
                      },
                    },
                  ],
                  xAxes: [
                    {
                      scaleLabel: {
                        display: true,
                        labelString: 'Score',
                        fontSize: 18,
                      },
                    },
                  ],
                  label: {
                    display: false,
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuizStats

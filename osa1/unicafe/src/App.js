import { useState } from 'react'

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad
  const average = (good - bad) / total
  const positive = 100 * (good / total) + " %"
  if (total > 0) {
    return (
      <table>
        <tbody>
        <StatisticLine text="good" value ={good} />
        <StatisticLine text="neutral" value ={neutral} />
        <StatisticLine text="bad" value ={bad} />
        <StatisticLine text="all" value ={total} />
        <StatisticLine text="average" value ={average} />
        <StatisticLine text="positive" value ={positive} />
        </tbody>
      </table>
    )
  } else {
    return (<p>No feedback given</p>)
  }
}

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    console.log("increasing, value before", good)
    setGood(good +1)
  }

  const handleNeutralClick = () => {
    console.log("increasing, value before", neutral)
    setNeutral(neutral +1)
  }

  const handleBadClick = () => {
    console.log("increasing, value before", bad)
    setBad(bad +1)
  }

  return (
    <>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App
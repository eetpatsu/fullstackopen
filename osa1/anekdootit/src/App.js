import { useState } from 'react'

const MostVoted = ({anecdotes, points}) => {
  const max = Math.max(...points)
  console.log("max votes", max)
  const index = points.indexOf(max)
  console.log("index of max", index)

  if (max > 0) {
    return (<p>{anecdotes[index]}<br></br> has {max} votes</p>)
  } else {
    return (<p>no votes so far</p>)
  }
}

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Uint8Array(anecdotes.length))

  const handleVoteClick = () => {
    console.log("adding one vote, votes before", points[selected])
    const copy = [...points]
    copy[selected] += 1  
    setPoints(copy)
  }

  const handleNextClick = () => {
    console.log("getting new anecdote, index before", selected)
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }
  
  return (
    <>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]} <br></br> has {points[selected]} votes </p>
      <Button handleClick={handleVoteClick} text="vote" />
      <Button handleClick={handleNextClick} text="next anecdote" />
      <h1>Anecdote with most votes</h1>
      <MostVoted anecdotes={anecdotes} points={points} />
    </>
  )
}

export default App
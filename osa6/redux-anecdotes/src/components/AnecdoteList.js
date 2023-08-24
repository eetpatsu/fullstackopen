import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { addNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    if (state.filter.length === 0)
      return state.anecdotes
    else
      return state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter))
  })

  const dispatch = useDispatch()

  const vote = (anecdote) => {
    console.log('vote', anecdote.id)
    dispatch(addVote(anecdote.id))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
    dispatch(addNotification(`you voted '${anecdote.content}'`))
  }

  return (
    <>
      {anecdotes.toSorted((a, b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList
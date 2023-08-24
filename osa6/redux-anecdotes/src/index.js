import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import store from './store'
// import { createStore, combineReducers } from 'redux'

/*
const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  filter: filterReducer
})
const store = createStore(reducer)
*/

console.log(store.getState())

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
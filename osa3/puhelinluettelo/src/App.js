import { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import Notification from './components/Notification'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationStyle, setNotificationStyle] = useState(null)

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const addPerson = (event) => {
    event.preventDefault()
    console.log("button clicked", event.target)
    if (persons.find(person => person.name === newName)) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        const returnedPerson = persons.find(person => person.name === newName)
        const personObject = { ...returnedPerson, number: newNumber }

        personService
          .update(returnedPerson.id, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
          })
          .catch(error => {
            console.log(error.name)
            if (error.name === 'TypeError')
              setNotificationMessage(`Information of ${newName} has already been deleted from the server`)
            else
              setNotificationMessage(`${error.response.data.error}`)
            setNotificationStyle("error")
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)
          })
        setNotificationMessage(`Updated ${newName}`)
        setNotificationStyle("success")
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      }
    } else if (persons.find(person => person.number === newNumber)) {
      alert(`${newNumber} is already added to phonebook`)
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }

      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          console.log(error.response.data)
          setNotificationMessage(`${error.response.data.error}`)
          setNotificationStyle("error")
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
      setNotificationMessage(`Added ${newName}`)
      setNotificationStyle("success")
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const removePerson = (name, id) => () => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .remove(id)
        .then(setPersons(persons.filter(person => person.id !== id)))
      setNotificationMessage(`Deleted ${name}`)
      setNotificationStyle("success")
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const handleNameChange = (event) => {
    console.log('name', event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log('number', event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log('filter', event.target.value)
    setNewFilter(event.target.value)
  }

  return (
    <>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} style={notificationStyle} />
      <Filter
        newFilter={newFilter}
        handleFilterChange={handleFilterChange}
      />
      <h3>add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons
        persons={persons}
        newFilter={newFilter}
        removePerson={removePerson}
      />
    </>
  )
}

export default App
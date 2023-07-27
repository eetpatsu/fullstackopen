import { useState, useEffect } from 'react'
import Countries from "./components/Countries"
import Filter from "./components/Filter"
import countryService from "./services/countries"

function App() {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    countryService
      .getAll()
      .then(initialCountries =>
        setCountries(initialCountries))
  }, [])

  const handleFilterChange = (event) => {
    console.log('filter', event.target.value)
    setNewFilter(event.target.value)
  }

  return (
    <>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <Countries countries={countries} newFilter={newFilter} />
    </>
  )
}

export default App;

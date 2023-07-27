const Countries = ({ countries, newFilter }) => {
  const filtered = countries.filter(country => country.name.common.toLowerCase().includes(newFilter))
  console.log('render', filtered.length, 'countries')
  console.log(filtered)

  if (filtered.length > 10) {
    return (<p>too many matches</p>)
  }
  if (filtered.length < 10 && filtered.length > 1) {
    return (
      <ul style={{ listStyle: "none", paddingLeft: 0 }}>
        {filtered.map(country => <li key={country.name.common}>{country.name.common}</li>)}
      </ul>
    )
  }
  if (filtered.length === 1) {
    return (filtered.map(country =>
      <div key={country.name.common}>
        <h1>{country.name.common}</h1>
        <p>capital {country.capital}<br />area {country.area}</p>
        <p><strong>languages</strong></p>
        <ul>
          {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
        </ul>
        <img style={{ width: 200 }} src={country.flags.png} alt={country.flags.alt}></img>
      </div>
    ))
  }
}

export default Countries
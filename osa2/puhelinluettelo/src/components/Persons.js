const Persons = ({ persons, newFilter, removePerson }) => {
  return (
    <div>
      {persons.filter(person =>
        person.name.toLowerCase().includes(newFilter.toLowerCase())).map(person =>
          <p key={person.name}>
            {person.name} {person.number}
            <button onClick={removePerson(person.name, person.id)}>{"delete"}</button>
          </p>
        )
      }
    </div>
  )
}

export default Persons
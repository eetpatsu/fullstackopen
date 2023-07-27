const Filter = ({ newFilter, handleFilterChange }) => {

  return <p>find countries <input value={newFilter} onChange={handleFilterChange} /></p>
}

export default Filter
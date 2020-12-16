function Search(props) {
  return (
    <select
      id="regionFilterDropDown"
      className="filter"
      onChange={props.filter}
    >
      <option value="All">All</option>
      <option value="Africa">Africa</option>
      <option value="Americas">Americas</option>
      <option value="Asia">Asia</option>
      <option value="Europe">Europe</option>
      <option value="Oceania">Oceania</option>
    </select>
  );
}

export default Search;

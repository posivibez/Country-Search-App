import "./RegionFilter.css";

function Search(props) {
  return (
    <div className="select-wrapper">
      <select
        id="regionFilterDropDown"
        className={props.theme === "light" ? "filter" : "filter filter-dark"}
        onChange={props.filter}
      >
        <option value="All">Filter by Region</option>
        <option value="Africa">Africa</option>
        <option value="Americas">Americas</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>

    </div>
  );
}

export default Search;

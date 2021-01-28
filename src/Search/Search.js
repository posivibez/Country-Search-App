import "./Search.css";

function Search(props) {
  return (
    <div className="search">
      <input
        id="searchField"
        className={props.theme === "light" ? "" : "input-dark"}
        type="text"
        placeholder="Search for a country..."
        onChange={props.search}
      />      
    </div>
  );
}

export default Search;

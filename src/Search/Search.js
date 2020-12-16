function Search(props) {
  return (
    <div className="search">
      <input
        id="searchField"
        type="text"
        placeholder="Search for a country..."
        onChange={props.search}
      />
    </div>
  );
}

export default Search;

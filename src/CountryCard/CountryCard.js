import "./CountryCard.css";

function CountryCard(props) {
  return (
    <div className={props.theme === "light" ? "country-card" : "country-card country-card-dark"} data-countryname={props.name} onClick={props.openOverlay}>

      <div className="country-card__image">
        <img src={props.flag} alt="Flag" />
      </div>

      <div className="country-card__details">
      
        <h2 className="country-card__name">{props.name}</h2>

        <p>
          <span>Population:</span> {props.population}
        </p>

        <p>
          <span>Region:</span> {props.region}
        </p>

        <p>
          <span>Capital:</span> {props.capital}
        </p>
      </div>
    </div>
  );
}

export default CountryCard;

import "./CountryCard.css";

function CountryCard(props) {
  return (
    <div className="country-card">
      <img src={props.flag} alt="" />

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

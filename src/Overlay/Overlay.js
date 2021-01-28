import "./Overlay.css";

const blank = "This country has no bordering countries.";

function Overlay(props) {
  return (
    <div
      className={
        props.overlayState === "visible" && props.theme === "light"
          ? "overlay-container"
          : props.overlayState === "visible" && props.theme === "dark"
          ? "overlay-container overlay-container-dark"
          : props.overlayState === "hidden"
          ? "overlay-container overlay-container-hidden"
          : ""
      }
    >
      <div className="overlay-box">
      <div className="button-box">

          <button className="btn btn-overlay" onClick={props.toggleOverlay}>
            &larr; Back
          </button>
      </div>
        <div className="overlay-left">


          <img className="overlay-img" src={props.flag} alt="" />
          
        </div>
        <div className="overlay-right">
          <h2 className="overlay-title">{props.name}</h2>

          <div className="overlay-right-details">
            <div className="details-left">
              <p>
                <span>Native Name: </span>
                {props.nativeName}
              </p>

              <p>
                <span>Population: </span>
                {props.population}
              </p>

              <p>
                <span>Region: </span>
                {props.region}
              </p>

              <p>
                <span>Sub Region: </span>
                {props.subRegion}
              </p>

              <p>
                <span>Capital: </span>
                {props.capital}
              </p>
            </div>

            <div className="details-right">
              <p>
                <span>Top Level Domain: </span>
                {props.topLevelDomain}
              </p>

              <p>
                <span>Currencies: </span>
                {props.currencies === undefined
                  ? blank
                  : props.currencies.length > 0
                  ? props.currencies.map((curr, i) => {
                      return (
                        <span key={i} className="map-element">
                          {curr}&nbsp;
                        </span>
                      );
                    })
                  : blank}
              </p>

              <p>
                <span>Languages: </span>
                {props.languages === undefined
                  ? blank
                  : props.languages.length > 0
                  ? props.languages.map((curr, i) => {
                      return (
                        <span key={i} className="map-element">
                          {curr}&nbsp;
                        </span>
                      );
                    })
                  : blank}
              </p>
            </div>
          </div>

          <div className="overlay-border-details">
            <p>
              <span>Border Coutnries: </span>

              {props.borders === undefined
                ? blank
                : props.borders.length > 0
                ? props.borders.map((t) => {
                    return <button className="borderbutton">{t}</button>;
                  })
                : blank}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Overlay;

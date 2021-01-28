import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

//component imports
import CountryCard from "./CountryCard/CountryCard";
import Search from "./Search/Search";
import RegionFilter from "./RegionFilter/RegionFilter";
import Buttons from "./Buttons/Buttons";
import Overlay from "./Overlay/Overlay";

//styling and themed imports
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./ThemeStyling/theme";
import { GlobalStyles } from "./ThemeStyling/global";

//fontawesome imports
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSun, faMoon, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
library.add(faSun, faMoon, faSearch);

const api = axios.create({
  baseURL: "https://restcountries.eu/rest/v2/",
});

//Variable to store search and filter values to use in update function
let searchValue;
let filterValue;

const resultsPerPage = 12;

//********APP STARTED********
const App = () => {
  //Set intial state for country data from API
  const [countryState, setCountryState] = useState({
    countries: [],
    page: 1,
    pageData: [],
  });

  const [clickedCountryState, setClickedCountryState] = useState({
    clickedCountryData: [],
    currency: '',
    language: '',
  });

  const [theme, setTheme] = useState("light");

  const [overlayState, setOverlay] = useState("hidden");

  const [errorState, setErrorState] =useState(false);

  // The function that toggles between themes
  const toggleTheme = () => {
    // if the theme is not light, then set it to dark
    if (theme === "light") {
      setTheme("dark");
      // otherwise, it should be light
    } else {
      setTheme("light");
    }
  };

  //function to load all data from API
  const allCountries = () => {
    api
      .get("/all")
      .then((res) => {
        //******NEED TO REFACTOR WHEN LEARN ASYNC FUNCTIONS BETTER IN REACT*****
        //THIS SHOULD BE IN A SEPERATE FUNCTION
        //WHEN CALL SEPERATE FUNCTION IT RUNS BEFORE DATA BACK FROM API
        //I'M not 100% sure how to do async function in react
        //just want to get this project done
        //then will research further and refactor code

        const start = (1 - 1) * resultsPerPage;
        const end = 1 * resultsPerPage;
        const newPageData = res.data.slice(start, end);

        setCountryState({
          countries: res.data,
          page: 1,
          pageData: newPageData,
        });
      })
      .catch((err) => console.error(err));
  };

  //Load initial country data ONLY once at start
  useEffect(() => {
    allCountries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //UPDATE FUNCTION triggered by change in search or filter fields
  const update = (event) => {
    setErrorState(false);
    //Flow when triggered by search
    if (event.target.id === "searchField") {
      searchValue = event.target.value;
      document.getElementById("regionFilterDropDown").selectedIndex = 0;
      if (searchValue == null || searchValue === "") {
        //when search field is cleared to empty
        //LOAD ALL COUNTRIES DATA
        allCountries();
      } else {
        //Otherwise load search results
        api.get("/name/" + searchValue).then((res) => {
          console.log(res.data);
          //******NEED TO REFACTOR WHEN LEARN ASYNC FUNCTIONS BETTER IN REACT*****
          const start = (1 - 1) * resultsPerPage;
          const end = 1 * resultsPerPage;
          const newPageData = res.data.slice(start, end);

          setCountryState({
            countries: res.data,
            page: 1,
            pageData: newPageData,
          });
        }).catch((error) => {
          setErrorState(true);
          console.error(`🔫 ${error}`) ;
        });
      }
      //Flow when triggered by filter
    } else if (event.target.id === "regionFilterDropDown") {
      filterValue = event.target.value;
      document.getElementById("searchField").value = "";
      if (filterValue === "All") {
        allCountries();
      } else {
        api.get("/region/" + filterValue).then((res) => {
          //******NEED TO REFACTOR WHEN LEARN ASYNC FUNCTIONS BETTER IN REACT*****
          const start = (1 - 1) * resultsPerPage;
          const end = 1 * resultsPerPage;
          const newPageData = res.data.slice(start, end);

          setCountryState({
            countries: res.data,
            page: 1,
            pageData: newPageData,
          });
        }).catch((error) => console.error(`🔫${error}`));
      }
    }
  };

  const pageChange = (event) => {
    console.log(event.target.dataset.goto);

    const page = event.target.dataset.goto;

    const start = (page - 1) * resultsPerPage;
    const end = page * resultsPerPage;
    const newPageData = countryState.countries.slice(start, end);

    setCountryState({
      countries: countryState.countries,
      page: page,
      pageData: newPageData,
    });
  };

  const openOverlay = (event) => {
    console.log(event.target.closest(".country-card").dataset.countryname);

    const clickedCountry = event.target.closest(".country-card").dataset
      .countryname;

      if(!clickedCountry) return;

    let index = countryState.pageData.findIndex((country) => {
      if (country.name === clickedCountry) {
        return true;
      } else {
        return '';
      }
    });

    const clickedCountryData = countryState.pageData[index];
    
    const currencyArr = clickedCountryData.currencies.map(e => e.name);
    const currName = currencyArr;

    const languageArr = clickedCountryData.languages.map(e => e.name);
    const languageName = languageArr;

    setClickedCountryState({
      clickedCountryData: clickedCountryData,
      currency: currName,
      language: languageName
    });

    toggleOverlay();
  };

  const toggleOverlay = () => {
    // if the theme is not light, then set it to dark
    if (overlayState === "hidden") {
      setOverlay("visible");
      // otherwise, it should be light
    } else {
      setOverlay("hidden");
    }
  };

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <>
        <GlobalStyles />
        <div className={theme === "light" ? "topbar" : "topbar topbar-dark"}>
          <div className="title">Where in the world?</div>
          <button
            className={theme === "light" ? "darkmode" : "darkmode-dark"}
            onClick={toggleTheme}
          >
            {theme === "light" ? (
              <span>
                <FontAwesomeIcon icon={faMoon} /> Dark Mode
              </span>
            ) : (
              <span>
                <FontAwesomeIcon icon={faSun} /> Light Mode
              </span>
            )}
          </button>
        </div>

        <Overlay
          name={clickedCountryState.clickedCountryData.name}
          nativeName={clickedCountryState.clickedCountryData.nativeName}
          population={clickedCountryState.clickedCountryData.population}
          region={clickedCountryState.clickedCountryData.region}
          subregion={clickedCountryState.clickedCountryData.subregion}
          capital={clickedCountryState.clickedCountryData.capital}
          topLevelDomain={clickedCountryState.clickedCountryData.topLevelDomain}
          currencies={clickedCountryState.currency}
          languages={clickedCountryState.language}
          borders={clickedCountryState.clickedCountryData.borders}
          flag={clickedCountryState.clickedCountryData.flag}
          //will also need to pass a toggle overlay function
          toggleOverlay={toggleOverlay}
          overlayState={overlayState}
          theme={theme}
        />

        <div className={overlayState === "visible" ? "hide-for-overlay" : "show-no-overlay"}>
          <div className="options">
            <Search search={update} theme={theme} />
            {errorState === true ? <p className="error">This search term doesn't look right please try another!</p> : ''}

            <RegionFilter filter={update} theme={theme} />
          </div>

          <Buttons
            pageNumber={+countryState.page}
            pageChange={pageChange}
            theme={theme}
            countries={countryState.countries}
            resultsPerPage={resultsPerPage}
          />

          <div className={"countries-grid"}>
            {countryState.pageData.map((country) => (
              <CountryCard
                key={country.numericCode}
                name={country.name}
                population={country.population}
                region={country.region}
                capital={country.capital}
                flag={country.flag}
                theme={theme}
                openOverlay={openOverlay}
              />
            ))}
          </div>

          <Buttons
            pageNumber={+countryState.page}
            pageChange={pageChange}
            theme={theme}
            countries={countryState.countries}
            resultsPerPage={resultsPerPage}
          />
        </div>
      </>
    </ThemeProvider>
  );
};

export default App;

//ADD EVENT MESSAGE WHEN NO MATCH TO A COUNTRY!!!**

//https://restcountries.eu/rest/v2/name/TEXT?regionalbloc=eu

//https://restcountries.eu/rest/v2/regionalbloc/eu

//MADE ALL THIS LOGIC TO DO FILTER AND SEARCH AT SAME TIME BUT NOT SURE IF THIS IS POSSIBLE???
// //FLOW WHEN TRIGGERED BY SEARCH FIELD
// if (event.target.id === "searchField") {
//   searchValue = event.target.value;

//   //check if a filter applied as well
//   if (filterValue == null || filterValue === "All") {
//     if (searchValue == null || searchValue === "") {
//       //when search field is cleared to empty
//       //LOAD ALL COUNTRIES DATA
//       allCountries();
//     } else {
//       //Otherwise load search results
//       api.get("/name/" + searchValue).then((res) => {
//         setCountryState({ countries: res.data });
//       });
//       console.log("error this condition is not taken into account in if statements");
//     }
//   } else {
//     //LOAD FILTERED SEARCH RESULTS ****DUPLICATED****
//     api.get("/name/" + searchValue + "?region=" + filterValue).then((res) => {
//       setCountryState({ countries: res.data });
//     });
//   }

// //FLOW WHEN TRIGGERED BY FILTER FIELD
// } else if (event.target.id === "regionFilterDropDown") {
//   filterValue = event.target.value;
//   console.log(searchValue);

//   //check if there is a search term as well
//   if (searchValue == null || searchValue === "") {
//     //LOAD region filter only
//     if (filterValue === "All") {
//       allCountries();
//     } else {
//       api.get("/region/" + filterValue).then((res) => {
//         setCountryState({ countries: res.data });
//       });
//     }
//   } else {
//     //LOAD region filter applied to search results ****DUPLICATED****
//     api.get("/name/" + searchValue + "?region=" + filterValue).then((res) => {
//       setCountryState({ countries: res.data });
//     });
//   }
// }

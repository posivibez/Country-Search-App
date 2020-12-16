import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

//component imports
import CountryCard from "./CountryCard/CountryCard";
import Search from "./Search/Search";
import RegionFilter from "./RegionFilter/RegionFilter";

//styling and themed imports
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./ThemeStyling/theme";
import { GlobalStyles } from "./ThemeStyling/global";

//fontawesome imports
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
library.add(faSun, faMoon);


const api = axios.create({
  baseURL: "https://restcountries.eu/rest/v2/",
});

//Variable to store search and filter values to use in update function
let searchValue;
let filterValue;

//********APP STARTED********
const App = () => {
  //Set intial state for country data from API
  const [countryState, setCountryState] = useState({
    countries: [],
  });
  const [theme, setTheme] = useState("light");

  // The function that toggles between themes
  const toggleTheme = () => {
    console.log("function fire");
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
    console.log("all country load triggered");
    api.get("/all").then((res) => {
      setCountryState({ countries: res.data });
    });
  };

  //Load initial country data ONLY once at start
  useEffect(() => {
    allCountries();
  }, []);

  //UPDATE FUNCTION triggered by change in search or filter fields
  const update = (event) => {
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
          setCountryState({ countries: res.data });
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
          setCountryState({ countries: res.data });
        });
      }
    }
  };

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <>
        <GlobalStyles />
        <div className="topbar">
          <div className="title">Where in the world?</div>
          <button className="darkmode" onClick={toggleTheme}>
            {theme === "light" 
              ? <span><FontAwesomeIcon icon={faMoon} /> Dark Mode</span>
              : <span><FontAwesomeIcon icon={faSun} /> Light Mode</span>}
          </button>
        </div>

        <div className="options">
          <Search search={update} />

          <RegionFilter filter={update} />
        </div>

        <div className="countries-grid">
          {countryState.countries.map((country) => (
            <CountryCard
              key={country.numericCode}
              name={country.name}
              population={country.population}
              region={country.region}
              capital={country.capital}
              flag={country.flag}
            />
          ))}
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
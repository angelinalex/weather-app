import React, { useState, useEffect, Suspense } from "react";
import fetchPlace from "./API/fetchPlace";
import fetchWeatherData from "./API/fetchWeatherData";
import fetchCity from "./API/fetchCity";
import parseWeatherData from "./API/parseWeatherData";
import CurrentWeatherView from "./Components/CurrentWeatherView";
import "./App.css";
import DailyForecastView from "./Components/DailyForecastView";
import HourlyForecast from "./Components/HourlyForecast";
import Details from "./Components/Details";

const App = () => {
  const [searchValue, setSearchValue] = useState("");
  const [resentSearch, setRecentSearch] = useState([]);
  const [inputValue, setInputValue] = useState("New York, NY, USA");
  const [suggestions, setSuggestions] = useState([]);
  const [parsedWeather, setParsedWeather] = useState(null);
  const [unit, setUnit] = useState("F");
  const [city, setCity] = useState("New York, NY, USA");

  const [location, setLocation] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(false); // State to indicate loading location

  useEffect(() => {
    const fetchData = async () => {
      if (inputValue.trim() !== "") {
        const placeRes = await fetchPlace(inputValue);
        setSuggestions(placeRes);

        if (placeRes.length > 0) {
          const city = placeRes[0];
          setSuggestions(placeRes);
          setCity(city.formatted_address);
          const weatherData = await fetchWeatherData(
            city.geometry.location.lat,
            city.geometry.location.lng
          );
          const parsedWeatherData = parseWeatherData(weatherData);
          if(!resentSearch.includes(city.formatted_address)){
            setRecentSearch([...resentSearch, city.formatted_address]);
          }

      
          setParsedWeather(parsedWeatherData);
        }
      } else {
        setSuggestions([]);
      }
    };
    fetchData();
  }, [inputValue]);

  const handleChangeInput = (event) => {
    setInputValue(event.target.value);
    console.log("triggered");
  };

  const handleChangeSearch = (event) => {
    setSearchValue(event.target.value);
  };

  const handleLocation = async () => {
    if (navigator.geolocation) {
      try {
        setLoadingLocation(true); // Start loading location
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });

        const city = await fetchCity(latitude, longitude);
        const weatherData = await fetchWeatherData(latitude, longitude);
        const parsedWeatherData = parseWeatherData(weatherData);
        setParsedWeather(parsedWeatherData);
        setInputValue(city);

        setCity(city);
      } catch (error) {
        console.error("Error getting current location:", error);
      } finally {
        setLoadingLocation(false); // Stop loading location
      }
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const handleUnitChange = (selectedUnit) => {
    setUnit(selectedUnit);
  };

  return (
    <div className="weather-dashboard">
      <div className="city-input">
   

        <input
          type="text"
          value={searchValue}
          onChange={handleChangeSearch}
          placeholder="Enter city or zip code"
          list="suggestions"
        />

        <button className="search-button" onClick={() => setInputValue(searchValue)}>
    
          Search
        </button>

        <button className="location-button" onClick={() => handleLocation()}>
          <img
            src={`${process.env.PUBLIC_URL}/assets/location.svg`}
            className="loc-img"
          />
        </button>
      </div>





      <Suspense fallback={<div>Loading...</div>}>
        {parsedWeather && (
          <CurrentWeatherView
            parsedWeatherData={parsedWeather}
            unit={unit}
            city={city}
          />
        )}
        {parsedWeather && (
          <Details parsedWeatherData={parsedWeather} unit={unit} />
        )}


<div className="recent-container"> 
          {/* <label for="Recent Searches">Recent Searches</label> */}


      <img src={`${process.env.PUBLIC_URL}/assets/clock.svg`} className="clock-img"/>
         
       <select
        className="selector"
          name="Recent Searches"
          value={inputValue}
          onChange={handleChangeInput}
        >
          {resentSearch.map((search, index) => (
            <option key={index} value={search}>
              {search}
            </option>
          ))}
        </select>
         </div>
     
        <div className="hourly-forecast-outer-container">
          {parsedWeather && (
            <HourlyForecast parsedWeatherData={parsedWeather} unit={unit} />
          )}
        </div>
        {parsedWeather && (
          <DailyForecastView parsedWeatherData={parsedWeather} unit={unit} />
        )}
      </Suspense>

      <div className="unit-buttons-container">
        <button onClick={() => handleUnitChange("F")}>F</button> |
        <button onClick={() => handleUnitChange("C")}>C</button>
      </div>
    </div>
  );
};

export default App;
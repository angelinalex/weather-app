// CurrentWeatherView.js
import React from 'react';
import './CurrentWeatherView.css';

/**
 * Component to display current weather information.
 * 
 * @param {Object} props - Component props.
 * @param {Object} props.parsedWeatherData - Parsed weather data object.
 * @param {string} props.unit - Unit of temperature (Fahrenheit or Celsius).
 * @param {string} props.city - City name.
 * @returns {JSX.Element} 
 */
const CurrentWeatherView = ({ parsedWeatherData, unit, city }) => {
  const image = `${process.env.PUBLIC_URL}/assets/${parsedWeatherData.current.icon}.png`;

  return (
    <div className="current-weather-container">
      <img src={image} alt={parsedWeatherData.current.description} className='icon' />
      <div className='current-descriptions-container'>
        <p className='city-text'>{city}</p>
        {unit === "F" ? (
          <div className='temp-large-txt'>{parsedWeatherData.current.currentTempFahrenheit} °F</div>
        ) : (
          <div className='temp-large-txt'>{parsedWeatherData.current.currentTempCelsius} °C</div>
        )}
        <div className='description-text'>{parsedWeatherData.current.description}</div>
        <div className='temp-range-text-current'>
          {unit === "F" ? (
            <p> L: {parsedWeatherData.daily[0].dailyLowFahrenheit} ° H: {parsedWeatherData.daily[0].dailyHighFahrenheit}° </p>
          ) : (
            <p> {parsedWeatherData.daily[0].dailyLowCelsius}° {parsedWeatherData.daily[0].dailyHighCelsius}°</p>
          )}
        </div>
      </div> {/** current description container */}
    </div> //current weather container
  );
};

export default CurrentWeatherView;

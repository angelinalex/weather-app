import React from 'react';
import './Details.css';

/**
 * Component to display additional weather details.
 * 
 * @param {Object} props - Component props.
 * @param {Object} props.parsedWeatherData - Parsed weather data object.
 * @param {string} props.unit - Unit of temperature (Fahrenheit or Celsius).
 * @returns {JSX.Element} - Rendered component.
 */
const Details = ({ parsedWeatherData, unit }) => {


  return (
    <div className='details-container'>
      {unit === "F" ? (
        <div className='item'>
          <img src={`${process.env.PUBLIC_URL}/assets/temperature-half.svg`} className='temperature-img' />
          Feels Like: {parsedWeatherData.current.currentFeelsLikeFahrenheit}°
        </div>
      ) : (
        <div className='item'>
          <img src={`${process.env.PUBLIC_URL}/assets/temperature-half.svg`} className='temperature-img' />
          Feels Like: {parsedWeatherData.current.currentFeelsLikeCelsius} °
        </div>
      )}

      <div className='item'>
        <img src={`${process.env.PUBLIC_URL}/assets/wind.svg`} className='wind-img' />
        {parsedWeatherData.current.windspeed}
      </div>

      <div className='item'>
        <img src={`${process.env.PUBLIC_URL}/assets/water.svg`} className='water-img' />
        {parsedWeatherData.current.currentHumidity} %
      </div>

      <div className='item'>
        <img src={`${process.env.PUBLIC_URL}/assets/uv.png`} className='uv-img' />
        {parsedWeatherData.current.currentUvi}
      </div>
    </div>
  );
};

export default Details;

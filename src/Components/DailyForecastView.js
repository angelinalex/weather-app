import './DailyForecastView.css';
import React, { useState, useEffect } from 'react';
import WeatherBar from '../Components/WeatherBar';

/**
 * Component to display the daily forecast for the next five days.
 * 
 * @param {Object} props - Component props.
 * @param {Object} props.parsedWeatherData - Parsed weather data object.
 * @param {string} props.unit - Unit of temperature (Fahrenheit or Celsius).
 * @returns {JSX.Element} - Rendered component.
 */
const DailyForecastView = ({ parsedWeatherData, unit }) => {
  const [nextFiveDays, setNextFiveDays] = useState([]);

  /**
   * Method sets the next 5 days
   */
  useEffect(() => {
    const today = new Date();
    today.setDate(today.getDate() + 1); // Move to tomorrow
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday ', 'Friday  ', 'Saturday'];
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const nextDays = [];

    for (let i = 0; i < 5; i++) {
      const nextDay = new Date(today);
      nextDay.setDate(today.getDate() + i);
      nextDays.push({
        date: nextDay.toLocaleDateString(undefined, options),
        weekday: days[nextDay.getDay()]
      });
    }
    setNextFiveDays(nextDays);
  }, []);

  // console.log("test pw")
  // console.log(parsedWeatherData)
  // console.log(parsedWeatherData.daily[0].dailyHighFahrenheit)

  return (
    <div className='daily-forecast-container'>
      <div className="forecast-header">
        <img src={`${process.env.PUBLIC_URL}/assets/calendar.svg`} alt="Calendar" className='cal-icon' />
        5-Day Forecast
      </div>
      <ul>
        {nextFiveDays.map((day, index) => (
// Inside the map function in your JSX
// Inside the map function in your JSX
// Inside the map function in your JSX
<li key={index}>
  <p className='weekday-text'>{day.weekday}</p>
  <div className="day-details">
    <img src={`${process.env.PUBLIC_URL}/assets/${parsedWeatherData.daily[index].icon}.png`} alt={parsedWeatherData.description} className='day-icon' />
    {unit === "F" ? (
      <div className='daily-temp-text'>
        {parsedWeatherData.daily[index].dailyLowFahrenheit} °F
        <WeatherBar lowTemp={parsedWeatherData.daily[index].dailyLowFahrenheit} highTemp={parsedWeatherData.daily[index].dailyHighFahrenheit} />
        {parsedWeatherData.daily[index].dailyHighFahrenheit} °F
      </div>
    ) : (
      <div className='daily-temp-text'>
        {parsedWeatherData.daily[index].dailyLowCelsius} °C
        <WeatherBar lowTemp={parsedWeatherData.daily[index].dailyLowCelsius} highTemp={parsedWeatherData.daily[index].dailyHighCelsius} />
        {parsedWeatherData.daily[index].dailyHighCelsius} °C
      </div>
    )}
  </div>
</li>



        ))}
      </ul>
    </div>
  );
};

export default DailyForecastView;

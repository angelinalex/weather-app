import React from 'react';
import './HourlyForecast.css';


/**
 * Component to display hourly forecast for the next 24 hours.
 * 
 * @param {Object} props - Component props.
 * @param {Object} props.parsedWeatherData - Parsed weather data object.
 * @param {string} props.unit - Unit of temperature (Fahrenheit or Celsius).
 * @returns {JSX.Element} - Rendered component.
 */
const HourlyForecast = ({ parsedWeatherData, unit }) => {
  const currentDate = new Date();
  const currentHour = currentDate.getHours(); // Get the current hour
  const sunrise = parsedWeatherData.current.sunrise;
  const sunset = parsedWeatherData.current.sunset;
  let sunsetAdded = false;
  let sunriseAdded = false;
  const next24Hours = [];

  
  // Generate an array of next 24 hours with formatted time
  for (let i = 0; i < 24; i++) {
    const nextHour = (currentHour + i) % 24; // Wrap around to 0 after 23
    let formattedHour = nextHour === 0 ? '12 AM' : nextHour < 12 ? `${nextHour} AM` : nextHour === 12 ? '12 PM' : `${nextHour - 12} PM`;
    next24Hours.push(formattedHour);
  }



  return (
    <div className='hourly-forecast-container'>
      <ul>
        {next24Hours.map((hour, index) => {
        
          if (hour === sunset && !sunsetAdded) {
            sunsetAdded = true;
            return (
              <>
                <div key={`${hour}-sunset`} className='hourly-forecast-item'>
                  <div className='hour-text'>{hour}</div>
                  <img src={`${process.env.PUBLIC_URL}/assets/01d.png`} alt={parsedWeatherData.description} />
                  <div className='temp-text'>Sunset</div>
                </div>
                
                <div key={`${hour}-temperature`} className='hourly-forecast-item'>
                  <div className='hour-text'>{hour}</div>
                  <img src={`${process.env.PUBLIC_URL}/assets/${parsedWeatherData.hourly[index].icon}.png`} alt={parsedWeatherData.description} />
                  <div className='temp-text'>
                    {unit === 'F' ? (
                      <li>{parsedWeatherData.hourly[index].hourlyTempFahrenheit}°F</li>
                    ) : (
                      <li>{parsedWeatherData.hourly[index].hourlyTempCelsius}°C</li>
                    )}
                  </div>
                </div>
              </>
            );
          }
  
          if (hour === sunrise && !sunriseAdded) {
            sunriseAdded = true;
            return (
              <>
                <div key={`${hour}-sunrise`} className='hourly-forecast-item'>
                  <div className='hour-text'>{hour}</div>
                  <img src={`${process.env.PUBLIC_URL}/assets/01d.png`} alt={parsedWeatherData.description} />
                  <div className='temp-text'>Sunrise</div>
                </div>
          
                <div key={`${hour}-temperature`} className='hourly-forecast-item'>
                  <div className='hour-text'>{hour}</div>
                  <img src={`${process.env.PUBLIC_URL}/assets/${parsedWeatherData.hourly[index].icon}.png`} alt={parsedWeatherData.description} />
                  <div className='temp-text'>
                    {unit === 'F' ? (
                      <li>{parsedWeatherData.hourly[index].hourlyTempFahrenheit}°F</li>
                    ) : (
                      <li>{parsedWeatherData.hourly[index].hourlyTempCelsius}°C</li>
                    )}
                  </div>
                </div>
              </>
            );
          }

          return (
            <div key={`${hour}-other`} className='hourly-forecast-item'>
              <div className='hour-text'>{hour}</div>
              <img src={`${process.env.PUBLIC_URL}/assets/${parsedWeatherData.hourly[index].icon}.png`} alt={parsedWeatherData.description} />
              <div className='temp-text'>
                {unit === 'F' ? (
                  <li>{parsedWeatherData.hourly[index].hourlyTempFahrenheit}°F</li>
                ) : (
                  <li>{parsedWeatherData.hourly[index].hourlyTempCelsius}°C</li>
                )}
              </div>
            </div>
          );
        })}
      </ul>
    </div>
  )};
  
export default HourlyForecast;
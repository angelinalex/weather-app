
/**
 * Parses weather data json file
 * @param {weatherData} 
 * @returns parsed weather data
 */
const parseWeatherData = (weatherData) => {
    // Convert temperature from Kelvin to Celsius and Fahrenheit
    const toCelsius = (kelvin) => kelvin - 273.15;
    const toFahrenheit = (kelvin) => (kelvin - 273.15) * (9 / 5) + 32;


    function unixTo24HourClock(unixTimestamp) {
      const milliseconds = unixTimestamp * 1000;
      const dateObject = new Date(milliseconds);
      const hour = dateObject.getHours();
      let formattedHour = hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`;
      return formattedHour;
  }
  

  
    // Extracting current weather information
    const currentWeather = {
      sunrise: unixTo24HourClock(weatherData.current.sunrise), 
      sunset:unixTo24HourClock(weatherData.current.sunset), 
      currentClouds: weatherData.current.clouds,
      currentTempKelvin: weatherData.current.temp,
      currentTempCelsius: toCelsius(weatherData.current.temp).toFixed(0),
      currentTempFahrenheit: toFahrenheit(weatherData.current.temp).toFixed(0),
      currentFeelsLikeKelvin: weatherData.current.feels_like,
      currentFeelsLikeCelsius: toCelsius(weatherData.current.feels_like).toFixed(0),
      currentFeelsLikeFahrenheit: toFahrenheit(weatherData.current.feels_like).toFixed(0),
      currentHumidity: weatherData.current.humidity,
      currentUvi: weatherData.current.uvi,
      description: weatherData.current.weather[0].description,
      icon: weatherData.current.weather[0].icon,
      windspeed: weatherData.current.wind_speed
    };
  
    // Extracting hourly weather information
    const hourlyWeatherData = weatherData.hourly.slice(0, 24).map(hour => ({
      hourlyClouds: hour.clouds,
      hourlyTempKelvin: hour.temp,
      hourlyTempCelsius: toCelsius(hour.temp).toFixed(0),
      hourlyTempFahrenheit: toFahrenheit(hour.temp).toFixed(0),
      hourlyFeelsLikeKelvin: hour.feels_like,
      hourlyFeelsLikeCelsius: toCelsius(hour.feels_like).toFixed(0),
      hourlyFeelsLikeFahrenheit: toFahrenheit(hour.feels_like).toFixed(0),
      hourlyHumidity: hour.humidity,
      hourlyWindSpeed: hour.wind_speed,
      hourlyUvi: hour.uvi,
      icon: hour.weather[0].icon

    }));
  
    // Extracting daily weather information for the next five days
    const dailyWeather = weatherData.daily.slice(0, 6).map(day => ({
      dailyClouds: day.clouds,
      dailyPerciption: day.pop,
      dailyLowFahrenheit: toFahrenheit(day.temp.min).toFixed(0),
      dailyLowCelsius: toCelsius(day.temp.min).toFixed(0),
      dailyHighFahrenheit:toFahrenheit(day.temp.max).toFixed(0),
      dailyHighCelsius:  toCelsius(day.temp.max).toFixed(0),
      description: day.weather[0].description,
      icon: day.weather[0].icon
    }));
  
    // Constructing the parsed weather data object
    const parsedWeatherData = {
      current: currentWeather,
      hourly: hourlyWeatherData,
      daily: dailyWeather
    };

    return parsedWeatherData;
  };
  

  export default parseWeatherData;
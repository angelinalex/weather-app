
/**
 * Fetches weather data from the OpenWeatherMap API
 * @param {lat} lat 
 * @param {lon} lon 
 * @returns weather data object
 */

const fetchWeatherData = async (lat, lon) => {
    const API_KEY = '537400cb7081dd52bd6bb0ec0e5c1b5d';
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude{alerts}&appid=${API_KEY}`
      );
      if (!response.ok) {
        // If the response is not ok, throw an error
        throw new Error('Failed to fetch weather data');
      }
      const data = await response.json();
      // console.log("Fetched weather");
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null; // Return null or handle the error in an appropriate way
    }
  };
  
  export default fetchWeatherData;
//   https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
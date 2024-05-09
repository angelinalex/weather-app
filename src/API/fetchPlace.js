/**
 * Google Geolocation API 
 * @param {value} value 
 * @returns results from google maps api of city suggestions
 */

const fetchPlace = async (value) => {
    const MY_API_KEY = 'AIzaSyAjpgZ77T7Lpfugkqdat9LLHV_Jqig4SvY';
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(value)}&key=${MY_API_KEY}`
      );
      const data = await response.json();
      if (data.status === 'OK') {
        // console.log("Fetched Place")
        // console.log(data)
        return data.results 
      } else {
        return [];
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  };
  
  export default fetchPlace;
  
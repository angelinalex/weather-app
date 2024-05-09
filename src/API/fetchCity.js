
/**
 * Fetches the city name based on latitude and longitude coordinates using the Google Geocoding API.
 * @param {number} latitude The latitude coordinate.
 * @param {number} longitude The longitude coordinate.
 * @returns {Promise<string>} A promise that resolves to the city name corresponding to the provided coordinates.
 * If fetching fails or no city is found, an empty string is returned.
 */
const fetchCity = async (latitude, longitude) => {
    const MY_API_KEY = 'AIzaSyAjpgZ77T7Lpfugkqdat9LLHV_Jqig4SvY';
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${MY_API_KEY}`
      );
      const data = await response.json();
      if (data.status === 'OK') {
        const addressComponents = data.results[0].address_components;
        let city = '';
        for (let i = 0; i < addressComponents.length; i++) {
          const component = addressComponents[i];
          if (component.types.includes('locality')) {
            city = component.long_name;
            break;
          }
        }
        return city;
      } else {
        return '';
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      return '';
    }
  };
  
  export default fetchCity;
  
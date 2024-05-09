import './WeatherBar.css';

/**
 * Component to display the weather difference bar.
 * 
 * @param {Object} props - Component props.
 * @param {number} props.lowTemp - The low temperature.
 * @param {number} props.highTemp - The high temperature.
 * @returns {JSX.Element} - Rendered component.
 */
const WeatherBar = ({ lowTemp, highTemp }) => {
  const difference = highTemp - lowTemp;
  const barWidth = difference * 2; 
  const temperatureThreshold = 10; 

  // Determine the color based on the temperature difference
  const barColor = difference > temperatureThreshold ? 'orange' : 'white';

  return (
    <div className="weather-difference-bar">
      <div className="bar-horizontal" style={{ width: `${barWidth}px`, backgroundColor: barColor }}></div>
      <div className="bar-vertical"></div>
    </div>
  );
};

export default WeatherBar;

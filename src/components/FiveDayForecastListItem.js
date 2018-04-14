import React, { PureComponent } from 'react';
import ForecastDay from './ForecastDay';
import ForecastWeatherAndIcon from './ForecastWeatherAndIcon';
import ForecastHighTemperature from './ForecastHighTemperature';
import ForecastLowTemperature from './ForecastLowTemperature';
import ForecastWind from './ForecastWind';
import ForecastCloudiness from './ForecastCloudiness';
import ForecastPressure from './ForecastPressure';
import PropTypes from 'prop-types';

export default class FiveDayForecastListItem extends PureComponent {
  static propTypes = {
    day: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    weather: PropTypes.string.isRequired,
    high: PropTypes.number,
    low: PropTypes.number,
    units: PropTypes.string.isRequired,
    wind: PropTypes.number.isRequired,
    clouds: PropTypes.number.isRequired,
    pressure: PropTypes.number.isRequired
  };

  render() {
    const {
      day,
      icon,
      weather,
      high,
      units,
      low,
      wind,
      clouds,
      pressure
    } = this.props;
    return (
      <li key={day}>
        <div className="forecast-list">
          <ForecastDay day={day} />
          <ForecastWeatherAndIcon icon={icon} weather={weather} />
          <br />
          <ForecastHighTemperature high={high} units={units} />
          <br />
          <ForecastLowTemperature low={low} units={units} />
          <br />
          <ForecastWind wind={Number(wind)} />
          <br />
          <ForecastCloudiness clouds={clouds} />
          <br />
          <ForecastPressure pressure={pressure} />
        </div>
        <br />
      </li>
    );
  }
}

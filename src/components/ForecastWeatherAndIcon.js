import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class FiveDayForecastCollWeatherAndIcon extends PureComponent {
  static propTypes = {
    icon: PropTypes.string.isRequired,
    weather: PropTypes.string.isRequired
  };

  render() {
    const { icon, weather } = this.props;
    return (
      <div className="forecast-weather-container" title="Weather Forecast">
        <img
          src={`https://openweathermap.org/img/w/${icon}.png`}
          alt="weather"
        />
        <p>{weather}</p>
      </div>
    );
  }
}

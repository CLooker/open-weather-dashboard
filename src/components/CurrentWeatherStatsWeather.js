import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class CurrentWeatherStats extends PureComponent {
  static propTypes = {
    iconCode: PropTypes.string.isRequired,
    weather: PropTypes.string.isRequired
  };

  render() {
    const { iconCode, weather } = this.props;
    return (
      <div className="weather-and-icon">
        <img
          src={`https://openweathermap.org/img/w/${iconCode}.png`}
          alt="Icon depicting current weather"
        />
        <h4>{weather}</h4>
      </div>
    );
  }
}

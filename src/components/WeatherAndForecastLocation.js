import React from 'react';
import PropTypes from 'prop-types';

const WeatherAndForecastLocation = ({ name }) => (
  <h1>Weather and Forecast in {name}</h1>
);

WeatherAndForecastLocation.propTypes = {
  name: PropTypes.string
};

export default WeatherAndForecastLocation;

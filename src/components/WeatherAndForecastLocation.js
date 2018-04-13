import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class WeatherAndForecastLocation extends PureComponent {
  static propTypes = {
    name: PropTypes.string
  };

  render() {
    const { name } = this.props;
    return <h1>Weather and Forecast in {name}</h1>;
  }
}

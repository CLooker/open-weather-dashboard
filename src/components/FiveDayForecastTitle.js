import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class FiveDayForecastTitle extends PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired
  };

  render() {
    const { name } = this.props;
    return <h3 className="five-day-forecast-title">Forecast in {name}</h3>;
  }
}

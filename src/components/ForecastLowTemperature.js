import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class FiveDayForecastCollLowTemperature extends PureComponent {
  static propTypes = {
    low: PropTypes.number,
    units: PropTypes.string.isRequired
  };

  render() {
    const { low, units } = this.props;
    return (
      <div title="Low Temperature">
        <img
          src={`https://lh3.googleusercontent.com/umbUE_DTWWiYad0I1ZB38WcSBFSLzSYYgKSJwTdHnjHHpuTMfvMoGHEiv4iPolyY-A=w300`}
          alt="low temperature"
        />
        <p>
          {low && low.toFixed(1)} &deg;{units}
        </p>
      </div>
    );
  }
}

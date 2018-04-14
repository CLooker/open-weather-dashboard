import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class FiveDayForecastCollHighTemperature extends PureComponent {
  static propTypes = {
    high: PropTypes.number,
    units: PropTypes.string.isRequired
  };

  render() {
    const { high, units } = this.props;
    return (
      <div title="High Temperature">
        <img
          src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYVYTeX-IT8VF_M7yQQsClU2CQEJTXgoi8T9jaGhB66jpLWQSw`}
          alt="high temperature"
        />
        <p>
          {high && high.toFixed(1)} &deg;{units}
        </p>
      </div>
    );
  }
}

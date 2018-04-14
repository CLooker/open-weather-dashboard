import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class CurrentTemperature extends PureComponent {
  static propTypes = {
    temp: PropTypes.number.isRequired,
    units: PropTypes.string.isRequired
  };

  render() {
    const { temp, units } = this.props;
    return (
      <div title="Current Temperature">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYVYTeX-IT8VF_M7yQQsClU2CQEJTXgoi8T9jaGhB66jpLWQSw"
          alt="temperature"
        />
        <h4>
          {temp.toFixed(1)} &deg;{units}
        </h4>
      </div>
    );
  }
}

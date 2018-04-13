import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class CurrentClouds extends PureComponent {
  static propTypes = {
    clouds: PropTypes.number.isRequired
  };

  render() {
    const { clouds } = this.props;
    return (
      <div>
        <img
          src={`https://openweathermap.org/img/w/03d.png`}
          alt="cloudiness"
        />
        <h4>{clouds}%</h4>
      </div>
    );
  }
}

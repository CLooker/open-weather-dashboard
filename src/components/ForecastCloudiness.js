import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class FiveDayForecastCollCloudiness extends PureComponent {
  static propTypes = {
    clouds: PropTypes.number.isRequired
  };

  render() {
    const { clouds } = this.props;
    return (
      <div title="Cloudiness">
        <img
          src={`https://openweathermap.org/img/w/03d.png`}
          alt="cloudiness"
        />
        <p>{clouds.toFixed()}%</p>
      </div>
    );
  }
}

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class PollutantReport extends PureComponent {
  static propTypes = {
    pollutant: PropTypes.string,
    data: PropTypes.object
  };

  render() {
    const {
      pollutant,
      data: { value, pressure, precision }
    } = this.props;

    return (
      <div
        style={{
          margin: '0 5px'
        }}
      >
        <strong title='Pollutant'>{pollutant.toUpperCase()}</strong>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            height: '15px',
            margin: '2px 0'
          }}
        >
          <h5 style={{ padding: '0 2px 0 0' }} title='Mixing Ratio'>
            Value:
          </h5>
          {value}
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            height: '15px',
            margin: '2px 0'
          }}
        >
          <h5 style={{ padding: '0 2px 0 0' }} title='Atmospheric Pressure'>
            Pressure:
          </h5>
          {pressure} hPa
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            height: '15px',
            margin: '2px 0'
          }}
        >
          <h5 style={{ padding: '0 2px 0 0' }} title='Measurement Precision'>
            Precision:
          </h5>
          {precision}
        </div>
      </div>
    );
  }
}

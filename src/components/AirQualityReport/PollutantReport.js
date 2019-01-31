import React from 'react';
import PropTypes from 'prop-types';

const PollutantReport = ({ pollutant, data }) => {
  const { value, pressure, precision } = data;

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
};

PollutantReport.propTypes = {
  pollutant: PropTypes.string,
  data: PropTypes.object
};

export default PollutantReport;

import React from 'react';
import PropTypes from 'prop-types';

const PollutantReport = ({ pollutant, data }) => {
  const { value, pressure, precision } = data;

  return (
    <div className='pollutant-report'>
      <strong title='Pollutant'>{pollutant.toUpperCase()}</strong>
      <div>
        <span title='Mixing Ratio'>
          <h5>Value:</h5> <p>{value}</p>
        </span>
        <span title='Atmospheric Pressure'>
          <h5>Pressure:</h5> <p>{pressure} hPa</p>
        </span>
        <span title='Measurement Precision'>
          <h5>Precision:</h5> <p>{precision}</p>
        </span>
      </div>
    </div>
  );
};

PollutantReport.propTypes = {
  pollutant: PropTypes.string,
  data: PropTypes.object
};

export default PollutantReport;

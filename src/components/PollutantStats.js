import React from 'react';

const PollutantStats = ({ type, chem }) => {
  switch (type) {
    case 'co':
    case 'so2':
      return (
        <div key={type} className="pollutant-stats">
          <div>
            <strong>{type.toUpperCase()}</strong>
          </div>
          <div>Value: {chem.value}</div>
          <div>Pressure: {chem.pressure} hPa </div>
          <div>Precision: {chem.precision}</div>
        </div>
      );
    case 'o3':
      return (
        <div key={type}>
          <div>{type.toUpperCase()}</div>
          <div>Value: {chem.value}</div>
        </div>
      );
    case 'no2':
      return (
        <div key={type}>
          <div>{type.toUpperCase()}</div>
          <div>Value: {chem.value}</div>
          <div>Precision: {chem.precision}</div>
        </div>
      );
    default:
      return null;
  }
};

export default PollutantStats;

import React from 'react';

const PollutantStats = ({ type, chem }) => {
  switch (type) {
    case 'co':
    case 'so2':
      return (
        <div key={type} className="pollutant-stats">
          <strong>{type.toUpperCase()}</strong>
          <div>
            <span>
              <h5>Value:</h5> <p>{chem.value}</p>
            </span>
            <span>
              <h5>Pressure:</h5> <p>{chem.pressure} hPa</p>
            </span>
            <span>
              <h5>Precision:</h5> <p>{chem.precision}</p>
            </span>
          </div>
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

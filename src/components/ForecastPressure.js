import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class ForecastPressure extends PureComponent {
  static propTypes = {
    pressure: PropTypes.number.isRequired
  };

  render() {
    const { pressure } = this.props;
    return (
      <div title="Barometric Pressure">
        <img
          src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe31uwyEa-r1R6ntqu4QPim6J6QQsIPqIrZ1RyEYebzC5esPGc`}
          alt="barometric pressure"
        />
        <p>{Number(pressure).toFixed()} hpa</p>
      </div>
    );
  }
}

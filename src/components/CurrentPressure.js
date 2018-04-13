import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class CurrentPressure extends PureComponent {
  static propTypes = {
    pressure: PropTypes.number.isRequired
  };

  render() {
    const { pressure } = this.props;
    return (
      <div>
        <img
          src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe31uwyEa-r1R6ntqu4QPim6J6QQsIPqIrZ1RyEYebzC5esPGc`}
          alt="barometric pressure"
        />
        <h4>{pressure} hpa</h4>
      </div>
    );
  }
}

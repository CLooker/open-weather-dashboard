import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { farenheit, celsius } from '../../utils';

export default class UnitsSwitcherInput extends Component {
  static propTypes = {
    dashboardUnits: PropTypes.string.isRequired,
    inputUnits: PropTypes.string.isRequired,
    handleClick: PropTypes.func.isRequired
  };

  render() {
    const { dashboardUnits, inputUnits, handleClick } = this.props;

    return (
      <input
        type='button'
        value={inputUnits === 'F' ? farenheit : celsius}
        style={{
          width: '50px',
          opacity: dashboardUnits === inputUnits ? '1' : '.5'
        }}
        onClick={handleClick}
      />
    );
  }
}

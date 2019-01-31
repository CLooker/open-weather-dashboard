import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { farenheit } from '../../utils';
import UnitsSwitcherInput from './UnitsSwitcherInput';

export default class UnitsSwitcher extends Component {
  static propTypes = {
    setUnits: PropTypes.func.isRequired,
    units: PropTypes.string.isRequired
  };

  handleClick = e =>
    this.props.setUnits(e.target.value === farenheit ? 'F' : 'C');

  render() {
    const { units } = this.props;
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          margin: '20px'
        }}
      >
        <div>
          <UnitsSwitcherInput
            dashboardUnits={units}
            inputUnits={'F'}
            handleClick={this.handleClick}
          />
          <UnitsSwitcherInput
            dashboardUnits={units}
            inputUnits={'C'}
            handleClick={this.handleClick}
          />
        </div>
      </div>
    );
  }
}

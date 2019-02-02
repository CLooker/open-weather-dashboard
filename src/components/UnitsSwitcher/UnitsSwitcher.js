import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UnitsSwitcherInput from './UnitsSwitcherInput';

export default class UnitsSwitcher extends Component {
  static propTypes = {
    setUnits: PropTypes.func.isRequired,
    units: PropTypes.string.isRequired
  };

  handleOnClick = e => this.props.setUnits(e.target.value);

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
            units={units}
            value={'F'}
            onClick={this.handleOnClick}
          />
          <UnitsSwitcherInput
            units={units}
            value={'C'}
            onClick={this.handleOnClick}
          />
        </div>
      </div>
    );
  }
}

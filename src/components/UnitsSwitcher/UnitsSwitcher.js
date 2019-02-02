import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import UnitsSwitcherInput from './UnitsSwitcherInput';

const UnitsSwitcherWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 20px;
`;

export default class UnitsSwitcher extends Component {
  static propTypes = {
    setUnits: PropTypes.func.isRequired,
    units: PropTypes.string.isRequired
  };

  handleOnClick = e => this.props.setUnits(e.target.value);

  render() {
    const { units } = this.props;
    return (
      <UnitsSwitcherWrapper>
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
      </UnitsSwitcherWrapper>
    );
  }
}

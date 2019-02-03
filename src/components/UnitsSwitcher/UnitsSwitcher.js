import React, { Component } from 'react';
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
  render() {
    return (
      <UnitsSwitcherWrapper>
        <div>
          <UnitsSwitcherInput value={'F'} />
          <UnitsSwitcherInput value={'C'} />
        </div>
      </UnitsSwitcherWrapper>
    );
  }
}

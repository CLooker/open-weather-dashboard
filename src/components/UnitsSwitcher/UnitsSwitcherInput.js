import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const UnitsSwitcherInputWrapper = styled.input`
  width: 50px;
  opacity: ${props => (props.units === props.value ? '1' : '0.5')};
`;

export default class UnitsSwitcherInput extends Component {
  static propTypes = {
    units: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
  };

  render() {
    return <UnitsSwitcherInputWrapper type='button' {...this.props} />;
  }
}

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { setUnits } from '../../state/actions/units';
import { getUnits } from '../../state/selectors';

const UnitsSwitcherInputWrapper = styled.input`
  width: 50px;
  opacity: ${props => (props.units === props.value ? '1' : '0.5')};
`;

class UnitsSwitcherInput extends PureComponent {
  static propTypes = {
    units: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    setUnits: PropTypes.func.isRequired
  };

  render() {
    const { setUnits, units, value } = this.props;

    return (
      <UnitsSwitcherInputWrapper
        type='button'
        units={units}
        value={value}
        onClick={setUnits}
      />
    );
  }
}

export default connect(
  getUnits,
  { setUnits }
)(UnitsSwitcherInput);

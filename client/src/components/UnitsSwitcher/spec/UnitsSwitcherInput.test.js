import React from 'react';
import { shallow } from 'enzyme';
import UnitsSwitcherInput from '../UnitsSwitcherInput';

describe('UnitsSwitcherInput', () => {
  const props = { units: 'F', value: 'F', onClick: jest.fn() };
  const Component = shallow(<UnitsSwitcherInput {...props} />);

  it('renders properly', () => {
    expect(Component).toMatchSnapshot();
  });
});

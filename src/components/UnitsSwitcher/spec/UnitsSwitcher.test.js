import React from 'react';
import { shallow } from 'enzyme';
import UnitsSwitcher from '../UnitsSwitcher';

describe('UnitsSwitcher', () => {
  const props = { units: 'F', setUnits: jest.fn() };
  const Component = shallow(<UnitsSwitcher {...props} />);

  it('renders properly', () => {
    expect(Component).toMatchSnapshot();
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import FiveDayForecast from '../FiveDayForecast';

describe('FiveDayForecast', () => {
  const props = { units: 'F' };
  const Component = shallow(<FiveDayForecast {...props} />);

  it('renders properly', () => {
    expect(Component).toMatchSnapshot();
  });
});

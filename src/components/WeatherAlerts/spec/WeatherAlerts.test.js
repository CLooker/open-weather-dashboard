import React from 'react';
import { shallow } from 'enzyme';
import WeatherAlerts from '../WeatherAlerts';

describe('WeatherAlerts', () => {
  const Component = shallow(<WeatherAlerts />);

  it('renders properly', () => {
    expect(Component).toMatchSnapshot();
  });
});

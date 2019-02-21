import React from 'react';
import { shallow } from 'enzyme';
import CurrentWeather from '../CurrentWeather';

describe('CurrentWeather', () => {
  const props = { units: 'F' };
  const Component = shallow(<CurrentWeather {...props} />);

  it('renders properly', () => {
    expect(Component).toMatchSnapshot();
  });
});

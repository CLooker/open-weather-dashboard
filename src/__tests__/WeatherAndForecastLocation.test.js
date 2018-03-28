import React from 'react';
import { shallow } from 'enzyme';
import WeatherAndForecastLocation from '../components/WeatherAndForecastLocation';

describe('Loading', () => {
  it('should render correctly', () => {
    const props = {
      name: 'Chicago'
    };
    const component = shallow(<WeatherAndForecastLocation {...props} />);
    expect(component).toMatchSnapshot();
  });
});

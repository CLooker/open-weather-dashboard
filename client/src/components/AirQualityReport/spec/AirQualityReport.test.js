import React from 'react';
import { shallow } from 'enzyme';
import AirQualityReport from '../AirQualityReport';

describe('AirQualityReport', () => {
  const Component = shallow(<AirQualityReport />);

  it('renders properly', () => {
    expect(Component).toMatchSnapshot();
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import PollutantData from '../PollutantData';

describe('AirQualityReport', () => {
  const props = {
    pollutant: 'CO',
    data: {
      value: '0.000004094272832766421',
      pressure: '84.79842746241263',
      precision: '-0.00000441777188726562'
    }
  };
  const Component = shallow(<PollutantData {...props} />);

  it('renders properly', () => {
    expect(Component).toMatchSnapshot();
  });
});

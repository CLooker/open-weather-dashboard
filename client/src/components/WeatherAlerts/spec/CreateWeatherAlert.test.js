import React from 'react';
import { shallow } from 'enzyme';
import CreateWeatherAlert from '../CreateWeatherAlert';

describe('CreateWeatherAlert', () => {
  const props = { incrementRegisteredAlertsTotal: jest.fn() };
  const Component = shallow(<CreateWeatherAlert {...props} />);

  it('renders properly', () => {
    expect(Component).toMatchSnapshot();
  });
});

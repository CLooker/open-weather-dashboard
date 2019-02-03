import React from 'react';
import { shallow } from 'enzyme';
import GetWeatherAlerts from '../GetWeatherAlerts';

describe('GetWeatherAlerts', () => {
  const props = {
    incrementTriggeredAlertsTotal: jest.fn(),
    setRegisteredAlertsTotal: jest.fn()
  };
  const Component = shallow(<GetWeatherAlerts {...props} />);

  it('renders properly', () => {
    expect(Component).toMatchSnapshot();
  });
});

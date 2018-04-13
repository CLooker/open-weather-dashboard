import React from 'react';
import { mount, shallow } from 'enzyme';
import WeatherAlertContainer from '../components/WeatherAlertContainer';

describe('WeatherAlertContainer', () => {
  let component;

  beforeEach(() => (component = shallow(<WeatherAlertContainer />)));

  describe('initialization', () => {
    it('should render correctly', () => {
      expect(component.debug()).toMatchSnapshot();
    });

    it('should have certain state', () => {
      const actual = component.state();
      const expected = {
        registeredAlerts: null,
        triggeredAlerts: []
      };
      expect(actual).toEqual(expected);
    });
  });

  describe('rendering', () => {
    const state = {
      registeredAlerts: '5',
      triggeredAlerts: ['hey', 'ho', "let's go"]
    };
    let mountedComponent;

    beforeEach(() => {
      mountedComponent = mount(<WeatherAlertContainer />);
      mountedComponent.setState(state);
    });

    describe('props passed to `CreateWeatherAlert`', () => {
      let actual;

      beforeEach(
        () => (actual = mountedComponent.find('CreateWeatherAlert').props())
      );

      it('should pass certain methods', () => {
        const expectedMethod = 'incrementRegisteredAlerts';
        expect(actual[expectedMethod]).toEqual(expect.any(Function));
      });
    });

    describe('props passed to `GetWeatherAlerts`', () => {
      let actual;

      beforeEach(
        () => (actual = mountedComponent.find('GetWeatherAlerts').props())
      );

      it('should pass certain props', () => {
        const { registeredAlerts, triggeredAlerts } = state;
        const expected = { registeredAlerts, triggeredAlerts };
        expect(actual).toEqual(expect.objectContaining(expected));
      });

      it('should pass certain methods', () => {
        const expected = ['updateRegisteredAlerts', 'updateTriggeredAlerts'];
        expected.forEach(method => {
          expect(actual[method]).toEqual(expect.any(Function));
        });
      });
    });
  });

  describe('methods', () => {
    describe('`updateRegisteredAlerts`', () => {
      it('shoule `setState` correctly', () => {
        const length = 5;
        component.instance().updateRegisteredAlerts({ length });
        const actual = component.state().registeredAlerts;
        const expected = length;
        expect(actual).toBe(expected);
      });
    });

    describe('`updateTriggeredAlerts`', () => {
      it('should', () => {
        const initialAlert = ['hey'];
        component.setState({ triggeredAlerts: initialAlert });
        const alerts = ['ho', "let's go"];
        component.instance().updateTriggeredAlerts(alerts);
        const actual = component.state().triggeredAlerts;
        const expected = initialAlert.concat(alerts);
        expect(actual).toEqual(expected);
      });
    });
  });
});

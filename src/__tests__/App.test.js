import React from 'react';
import { mount, shallow } from 'enzyme';
import App from '../components/App';

describe('App', () => {
  let component;

  beforeEach(() => (component = shallow(<App />)));

  describe('initialization', () => {
    it('should render correctly', () => {
      expect(component.debug()).toMatchSnapshot();
    });

    it('should have a particular state', () => {
      const actual = component.state();
      const expected = {
        name: null,
        units: 'F'
      };
      expect(actual).toEqual(expected);
    });

    describe('passing of state props to children', () => {
      let mountedComponent;

      beforeEach(() => {
        mountedComponent = mount(<App />);
      });

      describe('props passed to `UnitsSwitcher`', () => {
        let actual;

        beforeEach(() => {
          actual = mountedComponent.find('UnitsSwitcher').props();
        });

        it('should pass the correct props', () => {
          const expected = {
            name: null,
            units: 'F'
          };
          expect(actual).toEqual(expect.objectContaining(expected));
        });

        it('should pass a `setUnits` method', () => {
          expect(actual.setUnits).toEqual(expect.any(Function));
        });
      });

      describe('props passed to `CurrentWeather`', () => {
        let actual;

        beforeEach(() => {
          actual = mountedComponent.find('CurrentWeather').props();
        });

        it('should pass the correct props', () => {
          const expected = {
            units: 'F'
          };
          expect(actual).toEqual(expect.objectContaining(expected));
        });

        it('should pass a `setName` method', () => {
          expect(actual.setName).toEqual(expect.any(Function));
        });
      });

      describe('props passed to `FiveDayForecast`', () => {
        let actual;

        beforeEach(() => {
          actual = mountedComponent.find('FiveDayForecast').props();
        });

        it('should pass the correct props', () => {
          const expected = {
            name: null,
            units: 'F'
          };
          expect(actual).toEqual(expected);
        });
      });
    });
  });

  describe('methods', () => {
    describe('`setName`', () => {
      it('should set the `name` prop in state', () => {
        const name = 'Chicago';
        component.instance().setName(name);
        const actual = component.state().name;
        const expected = name;
        expect(actual).toBe(expected);
      });
    });

    describe('`setUnits`', () => {
      it('should set the `units` prop in state', () => {
        const units = 'C';
        component.instance().setUnits(units);
        const actual = component.state().units;
        const expected = units;
        expect(actual).toBe(expected);
      });
    });
  });
});

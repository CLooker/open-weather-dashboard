import React from 'react';
import { mount, shallow } from 'enzyme';
import GetWeatherAlerts from '../components/GetWeatherAlerts';

// refactor fetchAlerts so more testable

describe('GetWeatherAlerts', () => {
  const props = {
    registeredAlerts: 0,
    triggeredAlerts: [],
    updateRegisteredAlerts: jest.fn(),
    updateTriggeredAlerts: jest.fn()
  };

  let component;

  beforeEach(() => (component = shallow(<GetWeatherAlerts {...props} />)));

  afterEach(() => jest.restoreAllMocks());

  describe('initialization', () => {
    it('should render correctly', () => {
      expect(component.debug()).toMatchSnapshot();
    });

    it('should have certain props', () => {
      const actual = component.instance().props;
      const expected = props;
      expect(actual).toEqual(props);
    });

    describe('rendering', () => {
      test('that certain props are rendered', () => {
        const actual = component.html();
        const { registeredAlerts, triggeredAlerts } = props;
        const expected = [registeredAlerts, triggeredAlerts];
        expected.forEach(prop => {
          expect(actual).toContain(prop);
        });
      });

      describe('`componentDidMount`', () => {
        it('should call `fetchAlerts`', () => {
          const spy = jest.spyOn(GetWeatherAlerts.prototype, 'fetchAlerts');
          const mountedComponent = mount(<GetWeatherAlerts {...props} />);
          expect(spy).toHaveBeenCalled();
        });
      });
    });
  });
});

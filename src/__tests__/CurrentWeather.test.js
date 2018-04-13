import React from 'react';
import { mount, shallow } from 'enzyme';
import CurrentWeather from '../components/CurrentWeather';
import Loading from '../components/Loading';

// refactor fetchData to make it testable

describe('CurrentWeather', () => {
  const props = {
    setName: jest.fn(),
    units: 'F'
  };

  let component, mountedComponent;

  beforeEach(() => {
    component = shallow(<CurrentWeather {...props} />);
    mountedComponent = mount(<CurrentWeather {...props} />);
  });

  describe('initialization', () => {
    it('should render correctly', () => {
      expect(component.debug()).toMatchSnapshot();
    });

    it('should have certain props', () => {
      const actual = component.instance().props;
      const expected = props;
      expect(actual).toEqual(props);
    });

    it('should have certain state', () => {
      const actual = component.state();
      const expected = {
        name: null,
        temp: null,
        iconCode: null,
        weather: null
      };
      expect(actual).toEqual(expected);
    });

    describe('`componentDidMount`', () => {
      let componentDidMountSpy, fetchDataSpy, localMountedComponent;

      beforeEach(() => {
        componentDidMountSpy = jest.spyOn(
          CurrentWeather.prototype,
          'componentDidMount'
        );
        fetchDataSpy = jest.spyOn(CurrentWeather.prototype, 'fetchData');
        localMountedComponent = mount(<CurrentWeather {...props} />);
      });

      it('should call `componentDidMount`', () => {
        expect(componentDidMountSpy).toHaveBeenCalled();
      });

      it('should call `fetchData`', () => {
        expect(fetchDataSpy).toHaveBeenCalled();
      });
    });

    describe('rendering', () => {
      describe('rendering based on `state.name`', () => {
        describe('`name` is null', () => {
          it('should return `Loading`', () => {
            mountedComponent.instance().setState({ name: null });
            const actual = mountedComponent.html();
            const expected = shallow(<Loading />).html();
            expect(actual).toEqual(expect.stringContaining(expected));
          });
        });

        describe('`name` is not null', () => {
          test('that certain state props are rendered', () => {
            const data = {
              name: 'Chicago',
              temp: 44,
              iconCode: 'fakeCode',
              weather: 'cloudy',
              wind: 10,
              clouds: 88,
              pressure: 1000
            };
            mountedComponent.instance().setState(data);
            const actual = mountedComponent.html();
            const expected = Object.keys(data).map(key => data[key]);
            expected.forEach(data => expect(actual).toContain(data));
          });
        });
      });
    });
  });

  describe('methods', () => {
    describe('`returnUnitsString`', () => {
      describe('arg is "F"', () => {
        it('should return "imperial"', () => {
          const actual = mountedComponent.instance().returnUnitsString('F');
          const expected = 'imperial';
          expect(actual).toBe(expected);
        });
      });

      describe('arg is "C"', () => {
        it('should return "metric"', () => {
          const actual = mountedComponent.instance().returnUnitsString('C');
          const expected = 'metric';
          expect(actual).toBe(expected);
        });
      });
    });
  });

  describe('componentWillReceiveProps', () => {});
});

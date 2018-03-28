import React from 'react';
import { mount, shallow } from 'enzyme';
import FiveDayForecast from '../components/FiveDayForecast';
import Loading from '../components/Loading';
import moment from 'moment';

// refactor fetchData so it's testable

describe('FiveDayForecast', () => {
  const props = {
    name: 'Chicago',
    units: 'F'
  };

  let component;

  beforeEach(() => {
    component = shallow(<FiveDayForecast {...props} />);
  });

  describe('initialization', () => {
    it('should render correctly', () => {
      expect(component).toMatchSnapshot();
    });

    it('should have certain props', () => {
      const actual = component.instance().props;
      const expected = props;
      expect(actual).toEqual(props);
    });

    it('should have certain state', () => {
      const actual = component.state();
      const expected = {
        forecast: []
      };
      expect(actual).toEqual(expected);
    });

    describe('`componentDidMount`', () => {
      let componentDidMountSpy, fetchDataSpy;

      beforeEach(() => {
        componentDidMountSpy = jest.spyOn(
          FiveDayForecast.prototype,
          'componentDidMount'
        );
        fetchDataSpy = jest.spyOn(FiveDayForecast.prototype, 'fetchData');
        mount(<FiveDayForecast {...props} />);
      });

      it('should call `componentDidMount`', () => {
        expect(componentDidMountSpy).toHaveBeenCalled();
      });

      it('should call `fetchData`', () => {
        expect(fetchDataSpy).toHaveBeenCalled();
      });

      it('should call `fetchData` with the correct arg', () => {
        const actual = fetchDataSpy.mock.calls[0][0];
        const expected = props.units;
        expect(actual).toBe(expected);
      });
    });

    describe('rendering', () => {
      let mountedComponent;

      beforeEach(
        () => (mountedComponent = mount(<FiveDayForecast {...props} />))
      );

      describe('rendering based on `state.forecast.length`', () => {
        describe('`length` is less than 1', () => {
          it('should return `Loading`', () => {
            mountedComponent.instance().setState({ forecast: [] });
            const actual = mountedComponent.html();
            const expected = shallow(<Loading />).html();
            expect(actual).toEqual(expect.stringContaining(expected));
          });
        });

        describe('`length` is greater than 0', () => {
          test('that certain state props are rendered', () => {
            const data = {
              day: 'Monday',
              icon: 'fake',
              weather: 'cloudy',
              highs: 55,
              lows: 40,
              wind: 7,
              clouds: 55,
              pressure: 1000
            };
            mountedComponent.instance().setState({ forecast: [data] });
            const actual = mountedComponent.html();
            const expected = Object.keys(data).map(key => data[key]);
            expected.forEach(data => expect(actual).toContain(data));
          });
        });
      });
    });

    describe('methods', () => {
      describe('`removeToday`', () => {
        describe('today is not included', () => {
          const list = [
            {
              dt_txt: moment().add(1, 'day')
            }
          ];

          describe('what is returned', () => {
            it('should return an array', () => {
              const actual = component.instance().removeToday({ list });
              expect(actual).toEqual(expect.any(Array));
            });

            test('that the array returned has `length` 1', () => {
              const actual = component.instance().removeToday({ list }).length;
              const expected = 1;
              expect(actual).toBe(expected);
            });
          });
        });

        describe('today is included', () => {
          const list = [
            {
              dt_txt: moment()
            }
          ];

          describe('what is returned', () => {
            it('should return an array', () => {
              const actual = component.instance().removeToday({ list });
              expect(actual).toEqual(expect.any(Array));
            });

            test('that the array returned has `length` 0', () => {
              const actual = component.instance().removeToday({ list }).length;
              const expected = 0;
              expect(actual).toBe(expected);
            });
          });
        });
      });

      describe('`returnUnitsString`', () => {
        describe('arg is "F"', () => {
          it('should return "imperial"', () => {
            const actual = component.instance().returnUnitsString('F');
            const expected = 'imperial';
            expect(actual).toBe(expected);
          });
        });

        describe('arg is "C"', () => {
          it('should return "metric"', () => {
            const actual = component.instance().returnUnitsString('C');
            const expected = 'metric';
            expect(actual).toBe(expected);
          });
        });
      });

      describe('`prepareDaysCollForData`', () => {
        it('should return an object with the correct shape inside an array', () => {
          const day = moment().add(1, 'day');
          const daysColl = [day];
          const actual = component.instance().prepareDaysCollForData(daysColl);
          const expected = [
            {
              day,
              highs: [],
              lows: [],
              weather: [],
              wind: [],
              clouds: [],
              pressure: [],
              icon: null
            }
          ];
          expect(actual).toEqual(expected);
        });
      });

      describe('`returnAverages`', () => {
        it('should return an object with the correct shape inside an array', () => {
          const day = {
            day: moment().add(1, 'day'),
            highs: [1, 1],
            lows: [1, 1],
            wind: [1, 1],
            clouds: [1, 1],
            pressure: [1, 1]
          };
          const daysColl = [day];
          const actual = component.instance().returnAverages(daysColl);
          const expected = [
            {
              ...day,
              highs: 1,
              lows: 1,
              wind: '1.0',
              clouds: 1,
              pressure: 1
            }
          ];
          expect(actual).toEqual(expected);
        });
      });
    });

    //TODO
    describe('componentWillReceiveProps', () => {});
  });
});

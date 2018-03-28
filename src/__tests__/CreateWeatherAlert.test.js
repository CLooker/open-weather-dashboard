import React from 'react';
import { mount, shallow } from 'enzyme';
import CreateWeatherAlert from '../components/CreateWeatherAlert';
import moment from 'moment';

describe('CreateWeatherAlert', () => {
  const props = {
    incrementRegisteredAlerts: jest.fn()
  };

  let component;

  beforeEach(() => (component = shallow(<CreateWeatherAlert {...props} />)));

  afterEach(() => jest.restoreAllMocks());

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
        query: '',
        units: '',
        message: ''
      };
      expect(actual).toEqual(expected);
    });

    describe('rendering', () => {
      const mountedComponent = mount(<CreateWeatherAlert {...props} />);

      it('should render state', () => {
        const state = {
          query: '100',
          units: 'F',
          message: 'Success.'
        };
        mountedComponent.setState(state);

        const actual = mountedComponent.html();
        Object.keys(state).forEach(key => {
          expect(actual).toContain(state[key]);
        });
      });
    });
  });

  describe('methods', () => {
    describe('`getBody`', () => {
      it('should return an object of a certain shape', () => {
        const query = 300;
        const units = 'K';
        const actual = component
          .instance()
          .getBody({ query, units, start: moment().valueOf() });
        const expected = {
          time_period: {
            start: {
              expression: 'after',
              amount: expect.any(Number)
            },
            end: {
              expression: 'after',
              amount: expect.any(Number)
            }
          },
          conditions: [
            {
              name: 'temp',
              expression: '$gt',
              amount: parseInt(query, 10)
            }
          ],
          area: [
            {
              type: 'Point',
              coordinates: [41.9, 12.5]
            }
          ]
        };
        expect(actual).toEqual(expected);
      });
    });

    describe('`handleInputChange`', () => {
      it('should setState correctly', () => {
        const target = {
          value: '100'
        };
        component.instance().handleInputChange({ target });

        const actual = component.state().query;
        const expected = target.value;
        expect(actual).toBe(expected);
      });
    });

    describe('`handleUnitsChange`', () => {
      beforeEach(() => {});

      it('should setState correctly', () => {
        const target = {
          value: 'C'
        };
        component.instance().handleUnitsChange({ target });

        const actual = component.state().units;
        const expected = target.value;
        expect(actual).toBe(expected);
      });
    });

    //TODO
    describe('`handleSubmit`', () => {});

    describe('`validate`', () => {
      it('should call `validateInput`', () => {
        const spy = jest.spyOn(component.instance(), 'validate');
        component.instance().validate(100, 'K');
        expect(spy).toHaveBeenCalled();
      });
      describe('code paths', () => {
        describe('`validateInput` returns `true`', () => {
          it('should call `validateUnits`', () => {
            const spy = jest.spyOn(component.instance(), 'validateUnits');
            component.instance().validateInput = jest.fn(() => true);
            component.instance().validate(100, 'K');
            expect(spy).toHaveBeenCalled();
          });

          it('should return what `validateUnits` returns', () => {
            const returnValue = false;
            component.instance().validateInput = jest.fn(() => true);
            component.instance().validateUnits = jest.fn(() => returnValue);
            const actual = component.instance().validate(100, 'K');
            const expected = returnValue;
            expect(actual).toBe(expected);
          });
        });

        describe('`validateInput` returns `false`', () => {
          it('should not call `validateUnits`', () => {
            const spy = jest.spyOn(component.instance(), 'validateUnits');
            component.instance().validateInput = jest.fn(() => false);
            component.instance().validate(100, 'K');
            expect(spy).not.toHaveBeenCalled();
          });

          it('should return what `validateInput` returns', () => {
            const returnValue = false;
            component.instance().validateInput = jest.fn(() => returnValue);
            const actual = component.instance().validate(100, 'K');
            const expected = returnValue;
            expect(actual).toBe(expected);
          });
        });
      });
    });

    describe('`validateInput`', () => {
      describe('code paths', () => {
        describe('no input is given', () => {
          it('should call `alert`', () => {
            global.alert = jest.fn();
            component.instance().validateInput();
            expect(global.alert).toHaveBeenCalled();
          });

          it('should return `false`', () => {
            const actual = component.instance().validateInput();
            const expected = false;
            expect(actual).toBe(expected);
          });
        });

        describe('input is given', () => {
          describe('input is `NaN`', () => {
            const input = 'a string';

            it('should call `alert`', () => {
              global.alert = jest.fn();
              component.instance().validateInput(input);
              expect(global.alert).toHaveBeenCalled();
            });

            it('should return `false`', () => {
              const actual = component.instance().validateInput(input);
              const expected = false;
              expect(actual).toBe(expected);
            });
          });

          describe('input is a number', () => {
            it('should return true', () => {
              const input = 100;
              const actual = component.instance().validateInput(input);
              const expected = true;
              expect(actual).toBe(expected);
            });
          });
        });
      });
    });

    describe('`validateUnits`', () => {
      describe('code paths', () => {
        describe('no units are given', () => {
          it('should call `alert`', () => {
            global.alert = jest.fn();
            component.instance().validateUnits();
            expect(global.alert).toHaveBeenCalled();
          });

          it('should return `false`', () => {
            const actual = component.instance().validateUnits();
            const expected = false;
            expect(actual).toBe(expected);
          });
        });

        describe('units are given', () => {
          it('should return `true`', () => {
            const units = 'K';
            const actual = component.instance().validateUnits(units);
            const expected = true;
            expect(actual).toBe(expected);
          });
        });
      });
    });

    describe('`handleConversion`', () => {
      describe('code paths', () => {
        describe('`units`', () => {
          describe('"C"', () => {
            it('should return query converted to celsius', () => {
              const query = 100;
              const units = 'C';
              const actual = component
                .instance()
                .handleConversion({ query, units });
              const expected = parseInt(query, 10) + 273.15;
              expect(actual).toBe(expected);
            });
          });

          describe('"F"', () => {
            it('should return query converted to fahrenheit', () => {
              const query = 100;
              const units = 'F';
              const actual = component
                .instance()
                .handleConversion({ query, units });
              const expected = (parseInt(query, 10) + 459.67) * (5 / 9);
              expect(actual).toBe(expected);
            });
          });

          describe('"K"', () => {
            it('should return query', () => {
              const query = 100;
              const units = 'K';
              const actual = component
                .instance()
                .handleConversion({ query, units });
              const expected = query;
              expect(actual).toBe(expected);
            });
          });
        });
      });
    });

    describe('`afterFormSubmit`', () => {
      describe('`type` is "success"', () => {
        it('should `setState` correctly', () => {
          component.instance().afterFormSubmit({ type: 'success' });
          const expected = {
            query: '',
            units: '',
            message: 'Success.'
          };
          const actual = component.state();
          expect(actual).toEqual(expect.objectContaining(expected));
        });

        it('should call `incrementRegisteredAlerts`', () => {
          const mountedComponent = mount(<CreateWeatherAlert {...props} />);
          component.instance().afterFormSubmit({ type: 'success' });
          expect(
            mountedComponent.props().incrementRegisteredAlerts
          ).toHaveBeenCalled();
        });
      });

      describe('`type` is "failure"', () => {
        it('should `setState` correctly', () => {
          component.instance().afterFormSubmit({ type: 'failure' });
          const expected = {
            query: '',
            units: '',
            message: 'Something went wrong.'
          };
          const actual = component.state();
          expect(actual).toEqual(expect.objectContaining(expected));
        });
      });
    });
  });

  //TODO
  describe('events', () => {});
});

import React from 'react';
import { mount, shallow } from 'enzyme';
import UnitsSwitcher from '../components/UnitsSwitcher';

describe('UnitsSwitcher', () => {
  const props = {
    name: 'Chicago',
    units: 'F',
    setUnits: jest.fn()
  };

  let component, mountedComponent;

  beforeEach(() => {
    component = shallow(<UnitsSwitcher {...props} />);
    mountedComponent = mount(<UnitsSwitcher {...props} />);
  });

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

    describe('input style based on `units`', () => {
      describe('input style when `units` is "F"', () => {
        test('that the second input has the correct style', () => {
          const actual = mountedComponent
            .find('div input')
            .last()
            .props().style;
          const expected = {
            opacity: '.5'
          };
          expect(actual).toEqual(expect.objectContaining(expected));
        });

        test('that the first input has the correct style', () => {
          const actual = mountedComponent
            .find('div input')
            .first()
            .props().style;
          const expected = {
            opacity: '1'
          };
          expect(actual).toEqual(expect.objectContaining(expected));
        });
      });

      describe('input style when `units` is "C"', () => {
        const localProps = {
          ...props,
          units: 'C'
        };
        const localMountedComponent = mount(<UnitsSwitcher {...localProps} />);

        test('that the first input has the correct style', () => {
          const actual = localMountedComponent
            .find('input')
            .first()
            .props().style;
          const expected = {
            opacity: '.5'
          };
          expect(actual).toEqual(expect.objectContaining(expected));
        });

        test('that the second input has the correct style', () => {
          const actual = localMountedComponent
            .find('input')
            .last()
            .props().style;
          const expected = {
            opacity: '1'
          };
          expect(actual).toEqual(expect.objectContaining(expected));
        });
      });
    });
  });

  describe('method', () => {
    describe('`handleClick`', () => {
      let mockSetUnits, mockValue, localProps, localMountedComponent;

      beforeEach(() => {
        mockSetUnits = jest.fn();
        mockValue = 'ABC';
        localProps = {
          ...props,
          setUnits: mockSetUnits
        };
        localMountedComponent = mount(<UnitsSwitcher {...localProps} />);
        localMountedComponent
          .find('input')
          .first()
          .simulate('click', {
            target: {
              value: mockValue
            }
          });
      });

      it('should call the correct function when called', () => {
        expect(mockSetUnits).toHaveBeenCalled();
      });

      it('should pass the correct argument', () => {
        const actual = mockSetUnits.mock.calls[0][0];
        const expected = mockValue.split('')[1];
        expect(actual).toBe(expected);
      });
    });
  });
});

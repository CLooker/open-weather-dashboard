import React from 'react';
import { mount, shallow } from 'enzyme';
import AirQualityReport from '../components/AirQualityReport';
import Loading from '../components/Loading';
import PollutantStats from '../components/PollutantStats';

describe('AirQualityReport', () => {
  let component;

  beforeEach(() => (component = shallow(<AirQualityReport />)));

  afterEach(() => jest.restoreAllMocks());

  describe('initialization', () => {
    it('should render correctly', () => {
      expect(component).toMatchSnapshot();
    });

    describe('rendering', () => {
      describe('code paths', () => {
        describe('`isThereAnyLocalInfo` returns `false`', () => {
          it('should render `Loading`', () => {
            component.instance().isThereAnyLocalInfo = jest.fn(() => false);
            const actual = component.html();
            const expected = shallow(<Loading />).html();
            expect(actual).toEqual(expect.stringContaining(expected));
          });
        });

        describe('`isThereAnyLocalInfo` returns true', () => {
          describe('code paths', () => {
            describe('the nested objects in state are empty', () => {
              it('should not render `PollutantStats`', () => {
                const actual = component.find('PollutantStats').length;
                const expected = 0;
                expect(actual).toBe(expected);
              });
            });

            // next
            describe('at least one nested object in state has a value', () => {});
          });
        });
      });
    });
  });
});

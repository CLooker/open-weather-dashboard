import React from 'react';
import { shallow, mount } from 'enzyme';
import PollutantStats from '../components/PollutantStats';

describe('PollutantStats', () => {
  const props = [
    {
      type: 'co',
      chem: {
        value: 100,
        pressure: 1000,
        precision: 32924
      }
    },
    {
      type: 'so2',
      chem: {
        value: 132,
        pressure: 2000,
        precision: 23234
      }
    },
    {
      type: 'o3',
      chem: {
        value: 2349234
      }
    },
    {
      type: 'no2',
      chem: {
        value: 34539405,
        precision: 2345234
      }
    }
  ];

  describe('initialization', () => {
    it('should render correctly', () => {
      props.forEach(prop => {
        const component = shallow(<PollutantStats {...prop} />);
        expect(component).toMatchSnapshot();
      });
    });
  });
});

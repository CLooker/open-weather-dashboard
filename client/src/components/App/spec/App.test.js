import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';

describe('App', () => {
  const Component = shallow(<App />);

  it('renders properly', () => {
    expect(Component).toMatchSnapshot();
  });
});

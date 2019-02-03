import { SET_UNITS } from '../types';
import { setUnits } from './reducer';

describe('setUnits reducer', () => {
  it('sets units', () => {
    const units = 'F';
    expect(setUnits(undefined, { type: SET_UNITS, units })).toEqual(units);
  });
});

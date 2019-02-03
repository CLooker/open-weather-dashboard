import { SET_UNITS } from '../types';
import { setUnits } from './action';

describe('setUnits', () => {
  const unitsArr = ['F', 'C'];

  unitsArr.forEach(units =>
    it('creates an action to set the units', () =>
      expect(setUnits(units)).toEqual({ type: SET_UNITS, units }))
  );
});

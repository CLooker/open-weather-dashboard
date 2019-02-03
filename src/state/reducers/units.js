import types from '../types';
const { SET_UNITS } = types;

const setUnits = (state = 'F', { type, units }) =>
  type === SET_UNITS ? units : state;

export default setUnits;

import types from '../types';
const { SET_UNITS } = types;

export const setUnits = e => ({ type: SET_UNITS, units: e.target.value });

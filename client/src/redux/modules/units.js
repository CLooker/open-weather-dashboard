// constants
const SET_UNITS = 'SET_UNITS';

// action creators
export const setUnits = e => ({ type: SET_UNITS, units: e.target.value });

// selectors
export const getUnits = ({ units }) => ({ units });

const initialState = 'F';

const reducer = (state = initialState, { type, units }) =>
  type === SET_UNITS ? units : state;

export default reducer;

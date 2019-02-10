// constants
const SET_UNITS = 'SET_UNITS';

// action creators
export const setUnits = e => ({ type: SET_UNITS, units: e.target.value });

// selectors
export const getUnits = ({ units }) => ({ units });

const initialState = 'F';

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_UNITS:
      return { ...state, units: action.units };
    default:
      return state;
  }
}

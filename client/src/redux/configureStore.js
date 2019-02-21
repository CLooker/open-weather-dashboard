import { createStore, combineReducers } from 'redux';
import units from './modules/units';

const reducer = combineReducers({
  units
});

const configureStore = initialState => createStore(reducer, initialState);
export default configureStore;

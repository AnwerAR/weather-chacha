import { createStore } from 'redux';
import masterReducer from './reducers/master.reducer';

export default createStore(masterReducer);

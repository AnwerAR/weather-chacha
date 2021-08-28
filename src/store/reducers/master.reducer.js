import { combineReducers } from 'redux';
import unitReducer from './temp.unit.reducer';

const masterReducer = combineReducers({
    tempUnit: unitReducer,
});

const rootReducer = (state, action) => {
    /**
     * When we need to clear the whole redux store.
     */
    if (action.type === 'clear/store') {
        return masterReducer(undefined, action);
    }

    return masterReducer(state, action);
};

export default rootReducer;

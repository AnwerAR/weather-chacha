import { combineReducers } from 'redux';
import activeChartReducer from './active.chart.reducer';
import forecastReducer from './forecast.reducer';
import locationReducer from './location.reducer';
import unitReducer from './temp.unit.reducer';

const masterReducer = combineReducers({
    tempUnit: unitReducer,
    forecast: forecastReducer,
    location: locationReducer,
    activeChartKey: activeChartReducer,
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

import { formatForecastList, getAveragesFromFormattedData } from '../../helpers';

/**
 * Action types for forecastReducer
 */
const types = {
    loading: 'forecast/loading',
    error: 'forecast/error',
    fetch: 'forecast/fetch',
    clear: 'forecast/clear',
};

const initialState = {
    loading: false,
    errors: null,
    list: {},
    // average daily weather forecast. (extracted mean or mode form daily list based on data type)
    average: {},
    city: {},
};

/**
 * This reducer keeps track of temprature unit (metric: Celcius or imperial: Fahrenheit)
 */
const forecastReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.loading:
            return { ...state, loading: true, errors: null };
        case types.error:
            return {
                ...state, loading: false, errors: action.payload, list: {}, average: {}, city: {},
            };
        case types.fetch: {
            const list = formatForecastList([...action.payload.list]);

            return {
                ...state,
                loading: false,
                errors: null,
                list,
                average: getAveragesFromFormattedData(list),
                city: { ...action.payload.city },
            };
        }
        case types.clear:
            return initialState;
        default:
            return state;
    }
};

export default forecastReducer;

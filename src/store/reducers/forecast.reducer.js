import { formatForecastList } from '../../helpers';

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
    data: null,
};

/**
 * This reducer keeps track of temprature unit (metric: Celcius or imperial: Fahrenheit)
 */
const forecastReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.loading:
            return { ...state, loading: true, errors: null };
        case types.error:
            return { ...state, loading: false, errors: action.payload };
        case types.fetch:
            return {
                ...state,
                loading: false,
                errors: null,
                data: {
                    ...action.payload,
                    list: formatForecastList([...action.payload.list]),
                },
            };
        case types.clear:
            return initialState;
        default:
            return state;
    }
};

export default forecastReducer;

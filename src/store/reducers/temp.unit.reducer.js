/**
 * Action types for tempUnitReducer
 */
const types = {
    change: 'tempUnit/change',
};

/**
 * This reducer keeps track of temprature unit (metric: Celcius or imperial: Fahrenheit)
 */
const tempUnitReducer = (state = 'Celcius', action) => {
    switch (action.type) {
        case types.change:
            if (action.payload === state) {
                return state;
            }
            return action.payload;
        default:
            return state;
    }
};

export default tempUnitReducer;

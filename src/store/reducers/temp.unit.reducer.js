/**
 * Action types for tempUnitReducer
 */
const types = {
    change: 'tempUnit/change',
};

/**
 * This reducer keeps track of temprature unit (metric: Celcius or imperial: Fahrenheit)
 */
const tempUnitReducer = (state = 'metric', action) => {
    switch (action.type) {
        case types.change:
            return action.payload;
        default:
            return state;
    }
};

export default tempUnitReducer;

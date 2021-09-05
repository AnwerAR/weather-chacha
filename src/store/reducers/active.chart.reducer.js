/**
 * Active Chart types
 */
const types = {
    change: 'activeChart/change',
};

/**
 * This reducer holds null or array key of the day.
 */
const activeChartReducer = (state = null, action) => {
    switch (action.type) {
        case types.change:
            return action.payload;
        default:
            return state;
    }
};

export default activeChartReducer;

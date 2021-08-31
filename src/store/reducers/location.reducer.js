/**
 * Action types for locationReducer
 */
const types = {
    change: 'location/change',
    clear: 'location/clear',
    loading: 'location/loading',
    permPending: 'location/permPending',
    permGranted: 'location/permGranted',
    permDenied: 'location/permDenied',
};

const initialState = {
    loading: false,
    errors: null,
    lat: null,
    lon: null,
};

/**
 * This reducer stores user location (lat,lng), and status info of navigator.geolocation.
 */
const locationReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.loading:
            return { ...state, errors: null, loading: true };
        case types.clear:
            return initialState;
        case types.change:
            return {
                ...state, errors: null, loading: false, ...action.payload,
            };
        case types.permNotAsked:
            return {
                ...state,
                errors: {
                    code: 'Location Permission',
                    type: 'info',
                    message: 'This app needs your location info to get weather forecast for you.',
                },
                loading: false,
            };
        case types.permPending:
            return {
                ...state,
                errors: {
                    code: 'Location Permission',
                    type: 'info',
                    message: 'Getting your current location, Please wait...',
                },
                loading: false,
            };
        case types.permGranted:
            return {
                ...state, errors: null, loading: false, ...action.payload,
            };
        case types.permDenied:
            return {
                ...state,
                errors: {
                    code: 'Permission Error',
                    type: 'error',
                    message: 'We cannot access your location. Consider granting location permission to make this app work.',
                },
                lat: null,
                lon: null,
                loading: false,
            };
        default:
            return state;
    }
};

export default locationReducer;

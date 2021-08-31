import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { get as apiGet } from 'axios';

/**
 * Fetch data from remove server and dispatch to supplied Redux recducer.
 *
 * @param {Array} payload - Axios request payload
 * @param {String} entity - entity name (eg: forecast)
 * @param {Array} deps - useEffect dependencies.
 */
const useGetData = (payload, entity, deps = []) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: `${entity}/loading`, payload: true });
        if (localStorage.getItem(entity)) {
            dispatch({
                type: `${entity}/fetch`,
                payload: JSON.parse(localStorage.getItem(entity)),
            });
        } else if (payload.params.lat || payload.params.lon) {
            apiGet(payload.url, payload).then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: `${entity}/fetch`,
                        payload: response.data,
                    });
                    // eslint-disable-next-line max-len
                    localStorage.setItem(entity, JSON.stringify(response.data));
                }
            }).catch((errors) => {
                dispatch({
                    type: `${entity}/error`,
                    payload: errors.response.data,
                });
            });
        } else {
            dispatch({ type: `${entity}/loading`, payload: true });
        }
    }, [...deps]);
};

export default useGetData;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from './elements/card';
import Loader from './elements/loader';
import useGetData from './hooks/use.get.data';
import GenericTemplate from './templates/generic.template';
import ErrorComponent from './elements/error';

/**
 * Index of Weather Chacha application.
 * Things starts from here.
 */
export default function WeatherChacha() {
    const dispatch = useDispatch();
    const [refresh, setRefresh] = useState(null);
    useEffect(() => {
        if (refresh || !localStorage.getItem('wc-location')) {
            dispatch({ type: 'location/permPending', payload: true });

            /**
             * User refereshed, remove location from local storage to get users updated location.
             */
            localStorage.removeItem('wc-location');
            // localStorage.removeItem('forecast');

            navigator.geolocation.getCurrentPosition((pos) => {
                dispatch({
                    type: 'location/permGranted',
                    payload: { lat: pos.coords.latitude, lon: pos.coords.longitude },
                });
                localStorage.setItem('wc-location', JSON.stringify({ lat: pos.coords.latitude, lon: pos.coords.longitude }));
            }, () => {
                dispatch({ type: 'location/permDenied' });
                localStorage.removeItem('wc-location');
            }, { maximumAge: 60 * 60 * 1000 });
        } else {
            // Get location from local storage and dont ask to navigator..
            dispatch({
                type: 'location/permGranted',
                payload: JSON.parse(localStorage.getItem('wc-location')),
            });
        }

        // window.addEventListener('beforeunload', () => {
        //     localStorage.removeItem('wc-location');
        //     localStorage.removeItem('forecast');
        // });
    }, [refresh]);

    const {
        errors: locErrors, lat, lon,
    } = useSelector(({ location }) => location);

    useGetData({
        method: 'get',
        url: 'https://api.openweathermap.org/data/2.5/forecast',
        params: {
            lat,
            lon,
            appid: process.env.OPEN_WEATHER_API_KEY,
            units: 'metric',
        },
    }, 'forecast', [lat, lon]);

    const { loading, errors, data } = useSelector(({ forecast }) => forecast);

    // eslint-disable-next-line no-console
    console.log('foreCast', loading, errors, data);

    if (locErrors) {
        return (
            <GenericTemplate setRefresh={setRefresh}>
                <ErrorComponent
                    code={locErrors.code}
                    message={locErrors.message}
                    level={locErrors?.type}
                />
            </GenericTemplate>
        );
    }
    const today = new Date();
    const onlyDate = `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`;

    return loading ? (
        <div className="tw-flex tw-h-screen tw-justify-center tw-items-center">
            <Loader size="lg" />
        </div>
    ) : (
        <GenericTemplate setRefresh={setRefresh}>
            {errors && (
                <ErrorComponent code={errors.cod} message={errors.message} />
            )}

            <div className="tw-flex tw-flex-col lg:tw-flex-row lg:tw-flex-wrap lg:tw--m-2">
                {data && Object.keys(data.list).length > 0 && Object.keys(data.list).map((key) => (
                    <Card
                        title={key}
                        key={key}
                        date={data.list[key].average.date}
                        main={data.list[key].average.main}
                        weatherID={data.list[key].average.weatherID}
                        isActive={key === onlyDate}
                        clouds={data.list[key].average.clouds}
                    />
                ))}
            </div>
        </GenericTemplate>
    );
}

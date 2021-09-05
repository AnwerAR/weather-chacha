import React, { useEffect, useState, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './elements/loader';
import useGetData from './hooks/use.get.data';
import GenericTemplate from './templates/generic.template';
import ErrorComponent from './elements/error';
import ForecastCarousel from './blocks/forecast.carousel';
import { formatDailyForecastChartData } from './helpers';

const BarChart = React.lazy(() => import('./blocks/bar.chart'));
/**
 * Index of Weather Chacha application.
 * Things starts from here.
 */
export default function WeatherChacha() {
    const dispatch = useDispatch();
    const [refresh, setRefresh] = useState(null);
    const unit = useSelector(({ tempUnit }) => tempUnit);
    const chartKey = useSelector(({ activeChartKey }) => activeChartKey);

    useEffect(() => {
        if (refresh || !localStorage.getItem('forecast')) {
            dispatch({ type: 'location/permPending', payload: true });

            navigator.geolocation.getCurrentPosition((pos) => {
                dispatch({
                    type: 'location/permGranted',
                    payload: { lat: pos.coords.latitude, lon: pos.coords.longitude },
                });
            }, () => {
                dispatch({ type: 'location/permDenied' });
            }, { maximumAge: 60 * 60 * 1000 });
        }

        return () => {
            /**
             * Remove local storage on refresh.
             */
            localStorage.removeItem('forecast');
        };
    }, [refresh]);

    const {
        errors: locErrors, lat, lon,
    } = useSelector(({ location }) => location);

    /**
     * Fetch forecast data from API and dispatch response.data to forecast reducer
     */
    useGetData({
        method: 'get',
        url: 'https://api.openweathermap.org/data/2.5/forecast',
        params: {
            lat,
            lon,
            appid: process.env.OPEN_WEATHER_API_KEY,
            units: 'metric',
        },
    }, 'forecast', [lat, lon, refresh]);

    /**
     * Forecast state
     */
    const {
        loading, errors, average, list,
    } = useSelector(({ forecast }) => forecast);

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

    return loading ? (
        <div className="tw-flex tw-h-screen tw-justify-center tw-items-center">
            <Loader size="lg" />
        </div>
    ) : (
        <GenericTemplate setRefresh={setRefresh}>

            {errors && (
                <ErrorComponent code={errors.cod} message={errors.message} />
            )}

            <ForecastCarousel data={average} />

            {list && chartKey && list[chartKey] && (
                <Suspense fallback={(
                    <Loader />
                )}
                >
                    <BarChart
                        baseUnit={unit}
                        graphData={formatDailyForecastChartData(list[chartKey])}
                    />
                </Suspense>
            )}
        </GenericTemplate>
    );
}

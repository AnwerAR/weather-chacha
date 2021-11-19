import React from 'react';
import PT from 'prop-types';
import cls from 'classnames';
import { days, parseTemprature, weatherConditionList } from '../helpers';
import Button from './button';

export default function Card({
    title, date, isActive, main, weatherID, clouds, unit, onChartOpen,
}) {
    return (
        <div className={cls(
            'lg:tw-w-1/3 tw-relative',
        )}
        >
            <div className={cls(
                'tw-m-2 tw-p-4 tw-shadow-md tw-min-h-5',
                { 'tw-bg-green-50 tw-border tw-border-green-200': isActive },
                { 'tw-bg-white tw-border': !isActive },
            )}
            >
                <small>{`${title}, ${days[date.getDay()]}`}</small>
                {main?.temp && (
                    <div className="tw-text-4xl">
                        {parseTemprature(main.temp, unit)}
                    </div>
                )}
                {main?.temp && (
                    <div>
                        <span>{`Feels Like ${parseTemprature(main.feels_like, unit)}`}</span>
                    </div>
                )}

                {clouds ? (
                    <div>
                        <span>{`Clouds ${Math.round(clouds)}%`}</span>
                    </div>
                ) : (
                    <div>
                        <span>No Clouds</span>
                    </div>
                )}

                {weatherID && weatherConditionList[weatherID] && (
                    <>
                        <div>{weatherConditionList[weatherID].des}</div>
                        <img
                            alt={weatherConditionList[weatherID].des}
                            className="tw-absolute tw-top-0 tw-right-0"
                            src={`https://openweathermap.org/img/wn/${weatherConditionList[weatherID].icn}@4x.png`}
                            title={weatherConditionList[weatherID].des}
                        />
                    </>
                )}

                <Button size="sm" variant="plain" onClick={() => onChartOpen(title)}>See Details</Button>
            </div>
        </div>
    );
}

Card.defaultProps = {
    isActive: false,
    main: {},
    weatherID: null,
    clouds: null,
    onChartOpen: () => {},
};

Card.propTypes = {
    title: PT.string.isRequired,
    isActive: PT.bool,
    date: PT.objectOf(Date).isRequired,
    main: PT.shape({
        feels_like: PT.number,
        grnd_level: PT.number,
        humidity: PT.number,
        pressure: PT.number,
        sea_level: PT.number,
        temp: PT.number,
        temp_kf: PT.number,
        temp_max: PT.number,
    }),
    weatherID: PT.oneOfType([PT.string, PT.number]),
    clouds: PT.number,
    unit: PT.string.isRequired,
    onChartOpen: PT.func,
};

Card.displayName = 'elements/Card';

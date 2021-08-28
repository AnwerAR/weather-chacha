import React from 'react';
import { useSelector } from 'react-redux';
import Card from './elements/card';
import Loader from './elements/loader';
import './stylesheet.css';

/**
 * Index of Weather Chacha application.
 * Things starts from here.
 */
export default function WeatherChacha() {
    const unit = useSelector(({ tempUnit }) => tempUnit || '0');

    return (
        <div className="md:tw-container lg:tw-mx-auto">
            <div className="main-header">
                <h2>Weather Chacha</h2>
                <div>{unit}</div>
            </div>
            <div className="tw-flex tw-flex-col lg:tw-flex-row">
                <Loader size="lg" />
                <Card title="Hello world!" />
                <Card isActive title="Hello world!" />
            </div>
        </div>
    );
}

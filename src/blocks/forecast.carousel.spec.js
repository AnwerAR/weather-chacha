import React from 'react';
import { render, screen } from '../../test.utils';
import ForecastCarousel from './forecast.carousel';
import '@testing-library/jest-dom';
import { dailyAverage } from '../../__mocks/weather.data';

test('Render ForecastCarousel component', () => {
    render(<ForecastCarousel data={dailyAverage} />);

    expect(screen.getByText('2021/9/5, Sunday')).toBeInTheDocument();
    expect(screen.getByText('30°C')).toBeInTheDocument();
    expect(screen.getByText('Feels Like 31°C')).toBeInTheDocument();

    // Slide NO 2 and 3 title
    expect(screen.getByText('2021/9/6, Monday')).toBeInTheDocument();
    expect(screen.getByText('2021/9/7, Tuesday')).toBeInTheDocument();

    // TODO: Put more assertions
});

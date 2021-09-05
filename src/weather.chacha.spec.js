import React from 'react';
import { render, screen } from '../test.utils';
import WeatherChacha from './weather.chacha';
import '@testing-library/jest-dom';

test('Test weather chacha component (main entrance)', () => {
    render(<WeatherChacha />);

    expect(screen.getByText('Getting your current location, Please wait...')).toBeInTheDocument();

    // Need to put more test cases for solid integration testing
    // For instance we could check browser permission. API mocked responses etc
});

import React from 'react';
import { render, screen } from '../../test.utils';
import GenericTemplate from './generic.template';
import '@testing-library/jest-dom';

test('Test stateful generic template component', () => {
    render(<GenericTemplate />);

    expect(screen.getByText('Weather Chacha')).toBeInTheDocument();
    expect(screen.getByText('Celcius')).toBeInTheDocument();
    expect(screen.getByText('Fahrenheit')).toBeInTheDocument();
    expect(screen.getByText('Refresh')).toBeInTheDocument();

    // TODO: More assertions to cover all edge cases.
    // Tip: Try changing redux store state to change view. for instance change the temp unit.
});

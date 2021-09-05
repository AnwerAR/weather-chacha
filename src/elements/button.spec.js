import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from './button';

describe('Test Button', () => {
    it('Render Button', () => {
        const { container, getByText } = render(<Button>Click me</Button>);

        // Button text
        expect(getByText('Click me')).toBeInTheDocument();

        // Button snapshot.
        expect(container.firstChild).toMatchInlineSnapshot(`
        <button
          class="tw-bg-green-500 hover:tw-bg-green-700 tw-text-white tw-py-2 tw-px-4"
          type="button"
        >
          Click me
        </button>
        `);
    });
});

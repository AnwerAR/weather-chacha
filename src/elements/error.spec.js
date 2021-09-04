import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorComponent from './error';

describe('Test ErrorComponent', () => {
    it('Render ErrorComponent', () => {
        const { container, getByText } = render(<ErrorComponent
            code={404}
            message="Not found."
        />);

        // Must render temp according to prop values.
        expect(getByText('Not found.')).toBeInTheDocument();

        // ErrorComponent snapshot.
        expect(container.firstChild).toMatchInlineSnapshot(`
        <div
          class="tw-p-5 tw-bg-red-200 tw-text-red-800"
        >
          <h2>
            404
          </h2>
          <div>
            Not found.
          </div>
        </div>
        `);
    });
});

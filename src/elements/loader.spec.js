import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Loder from './loader';

describe('Test Loder element', () => {
    it('Render Loder Component', () => {
        const { container } = render(<Loder
            size="md"
            color="tw-border-green-800"
        />);

        // Loder snapshot.
        expect(container.firstChild).toMatchInlineSnapshot(`
        <div
          class="tw-justify-center tw-items-center"
        >
          <div
            class="tw-animate-spin tw-rounded-full tw-border-t-4 tw-border-b-4 tw-w-14 tw-h-14 tw-border-green-800"
          />
        </div>
        `);
    });
});

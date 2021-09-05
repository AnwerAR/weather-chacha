import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from './card';
import { days, getDateFromTS } from '../helpers';

describe('Test Card component', () => {
    const mainProps = {
        feels_like: 55,
        grnd_level: 2,
        humidity: 5.2,
        pressure: 8,
        sea_level: 2500,
        temp: 50,
        temp_kf: 45,
        temp_max: 55,
    };

    it('Render Card component', () => {
        const date = new Date();
        const title = getDateFromTS((Date.now() / 1000) - 86400);

        const { container, getByText } = render(<Card
            unit="Celcius"
            title={title}
            date={date}
            isToday
            main={mainProps}
            clouds={50}
        />);

        // Must render temp according to prop values.
        expect(getByText('50°C')).toBeInTheDocument();
        expect(getByText('Feels Like 55°C')).toBeInTheDocument();
        expect(getByText('Feels Like 55°C')).toBeInTheDocument();

        // Card snapshot.
        expect(container.firstChild).toMatchInlineSnapshot(`
        <div
          class="lg:tw-w-1/3 tw-relative"
        >
          <div
            class="tw-m-2 tw-p-4 tw-shadow-md tw-min-h-5 tw-bg-green-50 tw-border tw-border-green-200"
          >
            <small>
              ${title}, ${days[date.getDay()]}
            </small>
            <div
              class="tw-text-4xl"
            >
              50°C
            </div>
            <div>
              <span>
                Feels Like 55°C
              </span>
            </div>
            <div>
              <span>
                Clouds 50%
              </span>
            </div>
            <button
              class="tw-py-1 tw-text-green-500"
              type="button"
            >
              See Details
            </button>
          </div>
        </div>
        `);
    });
});

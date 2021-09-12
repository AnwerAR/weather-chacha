# WeatherChacha

A simple weather forecast application written in React using Redux, D3 and Tailwindcss

## Weather forecast API
Thanks to [OpenWeather](https://openweathermap.org) for providing 5 day forecast for any location with 3-hour step.
# Configuration 

**Setup:** clone the repo:
1. Generate a free API key from OpenWeather.
2. Create `.env` file in project root and put API key as `OPEN_WEATHER_API_KEY={your key}`

Run

    yarn install

> Note: Yarn is default package manager.

  

  

**Available commands**
Start development server

    yarn start
Create production bundle

    yarn build
**Linting:** This project uses `ESLint` and follows [Airbnb](https://github.com/airbnb/javascript) style guide.

    yarn lint
    yarn lint --fix
Unit tests are written using `@testing-library/react` and `Jest`

    yarn test
    yarn test:watch

E2E tests are written in `Cypress`

    yarn cypress:open
    yarn cypress:ci

Additionally `yarn ci` checks linting issues and performs unit tests.
`yarn deploy` will deploy the app to firebase (if configured)

## Github actions
Github actions will run for each new push (PR) which will deploy and preview after testing the app throughly.

## Styling
Using [Tailwindcss](https://github.com/tailwindlabs/tailwindcss) along with [PostCSS](https://github.com/postcss/postcss).

## Bundle Compression
`Brotli` and `Gzip`

## Important note regarding time calculation
According to OpenWeather API [documentation](https://openweathermap.org/forecast5) the `list.dt` will contain `Unix, UTC ` timestamp.

  

>  `list.dt` Time of data forecasted, unix, UTC

  

But this application uses native JS `Date` which itself takes care of timezones and returns local time from UTC `timestamp` because we should display forecasts according to local time of the user. So sometimes depending on the timezone and current time, we may have weather forecast of 6 days instead of 5 days.

  

For instance, when a user is 5 hours ahead of UTC then the day starts for him/her 5 hours earlier then standard UTC . So UTC response with 09:00PM will be equal to 02:00AM (next day) in current local time.

  

In such cases the first day and last day will contain incomplete set of weather forecasts.
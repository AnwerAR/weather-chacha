
# WeatherChacha
A simple weather forecast application written in React with <3

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

This project uses `ESLint` and follows [Airbnb](https://github.com/airbnb/javascript) style guide.

    yarn lint
    yarn lint --fix


## Styling

Using [Tailwindcss](https://github.com/tailwindlabs/tailwindcss) along with [PostCSS](https://github.com/postcss/postcss).

## Bundle Compression

`Brotli` and `Gzip`

/* eslint-disable import/prefer-default-export */

/**
 * Find the Mode from given array.
 *
 * @param {Array} n array of values.
 * @returns Mode from the input array
 */
const getMode = (n) => {
    let list = {};
    for (let i = 0; i < n.length; i += 1) {
        if (!list[n[i]]) {
            list = { ...list, [n[i]]: 1 };
        } else {
            list[n[i]] += 1;
        }
    }
    return Object.keys(list)
        .find((k) => list[k] === Math.max(...Object.values(list)));
};

/**
 * Get the Mode | Mean of an object type item. returns Mode for keys in [modeKeys]
 * and Mean for remaining items.
 *
 * @param {Object} obj - A 3 hour weather data object
 * @param {Number} divider - Mean divider (length of daily weather forecast items)
 * @param {Object} _avg - An average object that gets updated recursively.
 * @param {string[]} modeKeys - Keys from object which we need to get Mode instad of Mean.
 * @returns Average daily weather forecast data.
 */
const getModeOrMean = (obj, divider, _avg, modeKeys = []) => {
    const keys = Object.keys(obj);
    let newAvg = { ..._avg };
    for (let key = 0; key < keys.length; key += 1) {
        if (typeof obj[keys[key]] === 'number' && !modeKeys.includes(keys[key])) {
            if (newAvg && newAvg[keys[key]]) {
                newAvg[keys[key]] += obj[keys[key]] / divider;
            } else {
                newAvg = {
                    ...newAvg,
                    [keys[key]]: obj[keys[key]] / divider,
                };
            }
        } else {
            // eslint-disable-next-line no-lonely-if
            if (newAvg && newAvg[keys[key]]) {
                newAvg[keys[key]].push(obj[keys[key]]);
            } else {
                newAvg = {
                    ...newAvg,
                    [keys[key]]: [obj[keys[key]]],
                };
            }
        }
    }

    if (modeKeys.length > 0) {
        for (let key = 0; key < modeKeys.length; key += 1) {
            newAvg[`${modeKeys[key]}Avg`] = getMode(newAvg[modeKeys[key]]);
        }
    }

    return newAvg;
};

/**
 * Accepts array of weather data for one day and returns daily average.
 *
 * @param {Array} data - Array of 3 hours forecast objects,
 * @returns {Object} Daily average weather.
 */
export const calculateAvgDailyWeather = (data) => {
    const average = {
        clouds: 0,
        pop: 0,
        visibility: 0,
        weatherIDs: [],
    };

    for (let i = 0; i < data.length; i += 1) {
        if (data[i]?.dt) {
            average.date = new Date(data[i].dt * 1000);
        }
        if (data[i].clouds?.all) {
            average.clouds += data[i].clouds.all / data.length;
        }

        if (data[i]?.pop) {
            average.pop += data[i].pop / data.length;
        }

        if (data[i]?.visibility) {
            average.visibility += data[i].visibility / data.length;
        }

        if (data[i]?.weather) {
            average.weatherIDs.push(data[i].weather.map(({ id }) => id));
        }

        if (data[i]?.main) {
            average.main = getModeOrMean(data[i].main, data.length, average?.main);
        }

        if (data[i]?.wind) {
            average.wind = getModeOrMean(data[i].wind, data.length, average?.wind, ['deg']);
        }
    }

    if (average?.weatherIDs) {
        average.weatherID = getMode(average?.weatherIDs);
    }

    return average;
};

/**
 * Format the API returned forecast list date wise.
 *
 * API returns 40 forecast obejcts with 3hr steps.
 * 8 forecast objects daily. (24 / 3 = 8)
 * contains data for 5 days. (5 * 8 = 40)
 *
 * But sometimes The forecast starts from mid of the day, in that case there will
 * be still 40 forecast objects but will contain forecast for 6 days instead of 5.
 *
 * Constraints: each entry contains Unix timestamp.
 * @param {Array} data - Array of forecast list.
 * @returns Object of forecast list with `month_day` as keys. (eg: 8_30 for Aug, 30th)
 */

export function convertTZ(date, tzString) {
    return new Date((typeof date === 'string' ? new Date(date) : date).toLocaleString('en-US', { timeZone: tzString }));
}

export const formatForecastList = (data = []) => {
    const formatted = {};
    if (data.length < 1) {
        return {};
    }

    [...data].forEach((d) => {
        const date = new Date((d.dt) * 1000);
        const key = getDateFromTS(d.dt);
        // eslint-disable-next-line no-param-reassign
        d.date = date;
        if (formatted[key]) {
            formatted[key] = [
                ...formatted[key],
                d,
            ];
        } else {
            formatted[key] = [d];
        }
    });

    return formatted;
};

export const getAveragesFromFormattedData = (data) => {
    const average = {};
    const keys = Object.keys(data);
    for (let key = 0; key < keys.length; key += 1) {
        average[keys[key]] = calculateAvgDailyWeather(data[keys[key]]);
    }

    return average;
};

export const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/**
 * Weather condition list
 * Ref: https://openweathermap.org/weather-conditions
 */
export const weatherConditionList = {
    200: { m: 'Thunderstorm', des: 'thunderstorm with light rain', icn: '11d' },
    201: { m: 'Thunderstorm', des: 'thunderstorm with rain', icn: '11d' },
    202: { m: 'Thunderstorm', des: 'thunderstorm with heavy rain', icn: '11d' },
    210: { m: 'Thunderstorm', des: 'light thunderstorm', icn: '11d' },
    211: { m: 'Thunderstorm', des: 'thunderstorm', icn: '11d' },
    212: { m: 'Thunderstorm', des: 'heavy thunderstorm', icn: '11d' },
    221: { m: 'Thunderstorm', des: 'ragged thunderstorm', icn: '11d' },
    230: { m: 'Thunderstorm', des: 'thunderstorm with light drizzle', icn: '11d' },
    231: { m: 'Thunderstorm', des: 'thunderstorm with drizzle', icn: '11d' },
    232: { m: 'Thunderstorm', des: 'thunderstorm with heavy drizzle', icn: '11d' },

    300: { m: 'Drizzle', des: 'light intensity drizzle', icn: '09d' },
    301: { m: 'Drizzle', des: 'drizzle', icn: '09d' },
    302: { m: 'Drizzle', des: 'heavy intensity drizzle', icn: '09d' },
    310: { m: 'Drizzle', des: 'light intensity drizzle rain', icn: '09d' },
    311: { m: 'Drizzle', des: 'drizzle rain', icn: '09d' },
    312: { m: 'Drizzle', des: 'heavy intensity drizzle rain', icn: '09d' },
    313: { m: 'Drizzle', des: 'shower rain and drizzle', icn: '09d' },
    314: { m: 'Drizzle', des: 'heavy shower rain and drizzle', icn: '09d' },
    321: { m: 'Drizzle', des: 'shower drizzle', icn: '09d' },

    500: { m: 'Rain', des: 'light rain', icn: '10d' },
    501: { m: 'Rain', des: 'moderate rain', icn: '10d' },
    502: { m: 'Rain', des: 'heavy intensity rain', icn: '10d' },
    503: { m: 'Rain', des: 'very heavy rain', icn: '10d' },
    504: { m: 'Rain', des: 'extreme rain', icn: '10d' },
    511: { m: 'Rain', des: 'freezing rain', icn: '10d' },
    520: { m: 'Rain', des: 'light intensity shower rain', icn: '10d' },
    521: { m: 'Rain', des: 'shower rain', icn: '10d' },
    522: { m: 'Rain', des: 'heavy intensity shower rain', icn: '10d' },
    531: { m: 'Rain', des: 'ragged shower rain', icn: '10d' },

    600: { m: 'Snow', des: 'light snow', icn: '13d' },
    601: { m: 'Snow', des: 'Snow', icn: '13d' },
    602: { m: 'Snow', des: 'Heavy snow', icn: '13d' },
    611: { m: 'Snow', des: 'Sleet', icn: '13d' },
    612: { m: 'Snow', des: 'Light shower sleet', icn: '13d' },
    613: { m: 'Snow', des: 'Shower sleet', icn: '13d' },
    615: { m: 'Snow', des: 'Light rain and snow', icn: '13d' },
    616: { m: 'Snow', des: 'Rain and snow', icn: '13d' },
    620: { m: 'Snow', des: 'Light shower snow', icn: '13d' },
    621: { m: 'Snow', des: 'Shower snow', icn: '13d' },
    622: { m: 'Snow', des: 'Heavy shower snow', icn: '13d' },

    701: { m: 'Mist', des: 'mist', icn: '50d' },
    711: { m: 'Smoke', des: 'Smoke', icn: '50d' },
    721: { m: 'Haze', des: 'Haze', icn: '50d' },
    731: { m: 'Dust', des: 'sand/ dust whirls', icn: '50d' },
    741: { m: 'Fog', des: 'Fog', icn: '50d' },
    751: { m: 'Sand', des: 'Sand', icn: '50d' },
    761: { m: 'Dust', des: 'Dust', icn: '50d' },
    762: { m: 'Ash', des: 'Ash', icn: '50d' },
    771: { m: 'Squall', des: 'Squall', icn: '50d' },
    781: { m: 'Tornado', des: 'Tornado', icn: '50d' },

    800: { m: 'Clear', des: 'clear sky', icn: '01d' },

    801: { m: 'Clouds', des: 'few clouds: 11-25%', icn: '02d' },
    802: { m: 'Clouds', des: 'scattered clouds: 25-50%', icn: '03d' },
    803: { m: 'Clouds', des: 'broken clouds: 51-84%', icn: '04d' },
    804: { m: 'Clouds', des: 'overcast clouds: 85-100%', icn: '04d' },
};

export const parseTemprature = (value, unit = 'Celcius') => {
    if (unit === 'Celcius') {
        return `${Math.round(value)}°C`;
    }

    return `${Math.round((value * (9 / 5) + 32))}°F`;
};

/**
 * Generate date string form given Unix timestamp.
 *
 * Note: This application provides the weather forecast of users current
 * Location so intentionally not handling timezones.
 *
 * @param {number} timestamp - Unix timestamp
 * @returns date string format `YYYY/MM/DD`
 */
export const getDateFromTS = (timestamp) => {
    // convert to miliseconds
    const date = new Date(timestamp * 1000);
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
};

/**
 * Using build in JS date object and not taking care of multiple timezones.
 * @param {string} dateStr format = `YYYY/MM/DD`
 * @returns boolean
 */
export const isToday = (dateStr) => {
    const today = new Date();
    return dateStr === `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`;
};

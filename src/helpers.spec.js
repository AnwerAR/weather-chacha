import {
    getMode, days, isToday, getDateFromTS, parseTemprature, weatherConditionList,
} from './helpers';

describe('Test helper functions from helper.js', () => {
    it('getMode always retuens mode from given list of items', () => {
        const modeData = [
            30, 40, 50, 40,
        ];
        expect(Number(getMode(modeData))).toBe(40);
    });

    it('days variable will always hold name of days in a particular sequence', () => {
        expect(days).toStrictEqual(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']);
    });

    it('weatherConditionList has length of 55 conditions', () => {
        expect(Object.keys(weatherConditionList).length).toEqual(55);
    });

    it('parseTemprature: converts returns temprature from Celcius to fahrenheit', () => {
        expect(parseTemprature(0, 'fahrenheit')).toEqual('32°F');

        // Actual value is 33.8 but we get the value of Math.round which is 34.
        expect(parseTemprature(1, 'fahrenheit')).toEqual('34°F');

        // Actual value is 37.4 but since we rounded to it will be 37.
        expect(parseTemprature(3, 'fahrenheit')).toEqual('37°F');
    });

    it('getDateFromTS returns date in local timezone from given Unix timestamp', () => {
        expect(getDateFromTS(1630761369)).toEqual('2021/9/4');
    });

    it('isToday returns true if the given date is today or false', () => {
        const today = new Date();
        expect(isToday(`${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`)).toBeTruthy();
        expect(isToday(`${today.getFullYear()}/${today.getMonth()}/${today.getDate()}`)).toBeFalsy();
    });
});

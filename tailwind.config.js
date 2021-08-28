/* eslint-disable import/no-extraneous-dependencies */
const tailwindForms = require('@tailwindcss/forms');

module.exports = {
    mode: 'jit',
    purge: {
        enabled: true,
        // mode: 'all',
        // preserveHtmlElements: false,
        content: [
            './src/**/*.js',
            './src/**/*.jsx',
            './src/*.html',
        ],
    },
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {},
    },
    variants: {
        extend: {
            opacity: ['disabled'],
            bg: ['disabled'],
            text: ['disabled'],
        },
    },
    plugins: [
        tailwindForms,
    ],
    prefix: 'tw-',
};

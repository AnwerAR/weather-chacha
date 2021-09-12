import { apiResponse } from '../../__mocks/weather.data';

beforeEach(() => localStorage.removeItem('forecast'));

describe('An example e2e for weather chacha. Test whole application', () => {
    it('Should render location permission error', () => {
        cy.visit('http://localhost:8080');

        /**
         * Denying broswer permission.
         */
        cy.mockGeolocation();
        cy.contains('h2', 'Permission Error').should('be.visible');
        cy.contains('div', 'We cannot access your location. Consider granting location permission to make this app work.').should('be.visible');
    });

    it('Allow browser permission and test weather data', () => {
        /**
         * Intercept API request and load mock data instead of real data.
         */
        cy.intercept({ method: 'get', url: ' https://api.openweathermap.org/data/2.5/*' }, apiResponse)
            .as('weatherForecast');

        /**
         * Reload and grant geolocation permission
         */
        cy.reload();
        cy.mockGeolocation(3, 4);
        cy.wait('@weatherForecast').then(() => {
            /**
             * Skipping date/time related assertions to keep it simple, as date may
             * vary according to your test local environment and timezone.
             */
            cy.contains('Celcius').should('be.visible');
            cy.contains('h2', 'Mohra Nur, PK').should('be.visible');
            cy.contains('div', '30°C').should('be.visible');
            cy.contains('span', 'Feels Like 31°C').should('be.visible');
            cy.contains('div', 'clear sky').should('be.visible');
            cy.contains('div', 'Clouds 2%').should('be.visible');

            cy.contains('button', 'See Details').should('be.visible').click();
            cy.get('div[data-cy="bar-chart"]').its('length').should('be.equal', 1);

            /**
             * Convert temp to Fahrenheit and assert values.
             */
            cy.contains('button', 'Fahrenheit').click();

            cy.contains('div', '86°F').should('be.visible');
            cy.contains('span', 'Feels Like 89°F').should('be.visible');
        });
    });
});

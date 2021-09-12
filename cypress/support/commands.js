/**
 * Mock html5 geolocation API and return lat/lng or throw permission denied error.
 */
Cypress.Commands.add('mockGeolocation', (latitude, longitute) => {
    cy.window().then(($window) => {
        cy.stub($window.navigator.geolocation, 'getCurrentPosition', (callback, error) => {
            if (latitude && longitute) {
                return callback({ coords: { latitude, longitute } });
            }

            throw error({ code: 1 });
        });
    });
});

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('submit-button')
       */
      dataCy(id: string): Chainable<Element>;
    }
  }
}

Cypress.Commands.add('dataCy', (id: string) => {
  cy.get(`[data-cy=${id}]`);
});

// export {};

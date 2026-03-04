/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to find an input element by its name attribute
       * @example cy.findInput('username')
       */
      findInput(name: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}

Cypress.Commands.add('findInput', (name: string) => {
  return cy.get(`input[name="${name}"]`).should('be.visible');
});

export {};

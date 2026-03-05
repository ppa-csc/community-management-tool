declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to find an input element by its name attribute
       * @param name The value of the name attribute of the input element to find
       * @returns A Chainable containing the found input element
       * @example cy.findInput('username')
       */
      findInput(name: string): Chainable<Element>;
    }
  }
}

Cypress.Commands.add('findInput', (name: string) => {
  cy.get(`input[name="${name}"]`).should('be.visible');
});

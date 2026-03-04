/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to navigate to Instagram comments section
       * @example cy.navigateToInstagramComments()
       */
      navigateToInstagramComments(): Chainable<JQuery<HTMLElement>>;
    }
  }
}

Cypress.Commands.add('navigateToInstagramComments', () => {
  cy.get('button').contains('Instagram').should('be.visible').click();
  cy.get('button').contains('Kommentare').should('be.visible').click();
  cy.get('[role="treeitem"]').contains('Offen').should('be.visible').click();
  cy.url().should('include', '/instagram/comments');
  cy.contains('h1', 'Kommentare').should('be.visible');
});

export {};

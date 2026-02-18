/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('submit-button')
       */
      dataCy(value: string): Chainable<JQuery<HTMLElement>>;

      /**
       * Custom command to login via Keycloak
       * @example cy.loginWithKeycloak()
       */
      loginWithKeycloak(): Chainable<void>;

      /**
       * Custom command to navigate to Instagram comments section
       * @example cy.navigateToInstagramComments()
       */
      navigateToInstagramComments(): Chainable<void>;
    }
  }
}

Cypress.Commands.add('dataCy', (value: string) => {
  return cy.get(`[data-cy=${value}]`);
});

Cypress.Commands.add('loginWithKeycloak', () => {
  cy.session('keycloak-session', () => {
    cy.visit('/');
    cy.get('button').contains('Anmelden').click();

    cy.origin(
      'https://ppa-cmt-app-keycloak-ppa-dev.wonderfulflower-755a37d4.westeurope.azurecontainerapps.io',
      () => {
        const user = Cypress.env('user1');
        cy.get("input[name='username']").type(user.name);
        cy.get("input[name='password']").type(user.password);
        cy.get("input[type='submit']").click();
      },
    );

    cy.url().should('include', '/dashboard');
  });
});

Cypress.Commands.add('navigateToInstagramComments', () => {
  cy.get('button').contains('Instagram').should('be.visible').click();
  cy.get('button').contains('Kommentare').should('be.visible').click();
  cy.get('[role="treeitem"]').contains('Offen').should('be.visible').click();
  cy.url().should('include', '/instagram/comments');
  cy.contains('h1', 'Kommentare').should('be.visible');
});

export {};

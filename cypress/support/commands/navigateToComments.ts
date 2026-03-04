/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to navigate to comments section for any platform
       * @example cy.navigateToComments('instagram')
       */
      navigateToComments(platform: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}

Cypress.Commands.add('navigateToComments', (platform: string) => {
  // Capitalize first letter for button matching (Instagram, Facebook, etc.)
  const capitalizedPlatform =
    platform.charAt(0).toUpperCase() + platform.slice(1);

  cy.findByRole('treeitem', { name: capitalizedPlatform })
    .should('be.visible')
    .click();

  cy.findByRole('treeitem', { name: 'Kommentare' })
    .should('be.visible')
    .click();

  cy.findByRole('treeitem', { name: /öffentliche Ordner Offen/i })
    .should('be.visible')
    .click();

  // URL always uses lowercase
  cy.url().should('include', `/${platform.toLowerCase()}/comments`);

  cy.findByRole('heading', { name: 'Kommentare', level: 1 }).should(
    'be.visible',
  );
});

export {};

export class InstagramCommentsPage {
  readonly platform = 'Instagram';
  readonly url = '/instagram/comments';
  readonly heading = 'Kommentare';
  readonly emptyStateText = 'Keine Kommentare gefunden';

  navigate() {
    cy.findByRole('treeitem', { name: this.platform })
      .should('be.visible')
      .click();

    cy.findByRole('treeitem', { name: 'Kommentare' })
      .should('be.visible')
      .click();

    cy.findByRole('treeitem', { name: /öffentliche Ordner Offen/i })
      .should('be.visible')
      .click();
  }

  assertIsLoaded() {
    cy.url().should('include', this.url);
    cy.findByRole('heading', { name: this.heading, level: 1 }).should(
      'be.visible',
    );
  }

  assertEmptyState() {
    cy.contains(this.emptyStateText).should('be.visible');
  }

  assertHasComments() {
    cy.contains(this.emptyStateText).should('not.exist');
  }

  assertToggleEnabled() {
    cy.get('button[role="switch"]')
      .should('be.enabled')
      .should('not.have.attr', 'disabled');
  }

  interceptComments(body: unknown, alias = 'getComments') {
    cy.intercept('GET', '**/api/v1/comments/direct?*', {
      statusCode: 200,
      body,
    }).as(alias);
  }
}

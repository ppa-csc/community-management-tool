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

  toggleFocusMode() {
    cy.get('button[role="switch"]').click();
  }

  assertCommentCardsVisible(timeout = 15000) {
    cy.get('img[alt="three-dots-icon"]', { timeout }).should('be.visible');
  }

  interceptCommentsLoad(alias = 'commentsLoad') {
    cy.intercept('GET', '**/api/v1/comments/direct?*').as(alias);
  }

  assertCommentCardsOrEmptyState(timeout = 15000) {
    cy.wait('@commentsLoad').then((interception) => {
      const body = interception.response?.body;
      const hasData =
        body?.comments?.length > 0 || body?.totalCommentsCount > 0;

      if (hasData) {
        cy.log('**API returned comments — expecting cards**');
        cy.get('img[alt="three-dots-icon"]', { timeout }).should('be.visible');
      } else {
        cy.log('**API returned no comments — expecting empty state**');
        cy.contains(this.emptyStateText, { timeout }).should('be.visible');
      }
    });
  }

  getLatestCommentDate() {
    return cy.get('div[aria-hidden="true"]').first().invoke('text');
  }

  interceptComments(body: unknown, alias = 'getComments') {
    cy.intercept('GET', '**/api/v1/comments/direct?*', {
      statusCode: 200,
      body,
    }).as(alias);
  }
}

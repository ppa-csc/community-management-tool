describe('Login Test Suite with Sessions', () => {
  beforeEach(() => {
    cy.session('sessionName', () => {
      cy.visit('/');
      cy.get('button').contains('Anmelden').should('be.visible').click();

      cy.origin(
        'https://ppa-cmt-app-keycloak-ppa-dev.wonderfulflower-755a37d4.westeurope.azurecontainerapps.io',
        () => {
          const user = Cypress.env('user1');
          cy.get("input[name='username']").type(user.name);
          cy.get("input[name='password']").type(user.password);
          cy.get("input[type='submit']").click();
        },
      );

      cy.url({ timeout: 15000 }).should('include', '/dashboard');
      cy.contains('h1', 'Dashboard', { timeout: 15000 }).should('be.visible');
    });
  });

  it('should display empty comment list when there are no comments', () => {
    cy.fixture('comments').then((comments) => {
      cy.intercept('GET', '**/api/v1/comments/direct?*', {
        statusCode: 200,
        body: comments.emptyComments,
      }).as('getComments');
    });

    cy.visit('/');

    cy.navigateToInstagramComments();

    cy.wait('@getComments');

    cy.url().should('include', '/instagram/comments');
    cy.contains('h1', 'Kommentare').should('be.visible');
    cy.contains('Keine Kommentare gefunden').should('be.visible');
  });

  it('should display a mocked comment', () => {
    cy.fixture('comments').then((comments) => {
      const commentData = comments.singleComment;
      // Update timestamps to today
      const today = new Date().toISOString();
      commentData.comments[0].createdAt = today;
      commentData.comments[0].modifiedAt = today;

      cy.intercept('GET', '**/api/v1/comments/direct?*', {
        statusCode: 200,
        body: commentData,
      }).as('getComments');
    });

    cy.visit('/');

    cy.navigateToInstagramComments();

    cy.wait('@getComments');

    cy.url().should('include', '/instagram/comments');
    cy.contains('h1', 'Kommentare').should('be.visible');
    cy.contains('Keine Kommentare gefunden').should('not.exist');
  });
});

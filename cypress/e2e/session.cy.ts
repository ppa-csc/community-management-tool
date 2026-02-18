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
      
      // Wait for redirect back to main app and then to dashboard
      cy.url({ timeout: 15000 }).should('include', '/dashboard');
      cy.contains('h1', 'Dashboard', { timeout: 15000 }).should('be.visible');
    });
  });

  it('should display dashboard after login', () => {
    cy.visit('/');
    cy.url().should('include', '/dashboard');
    cy.contains('h1', 'Dashboard').should('be.visible');
  });

  describe('Navigate to Instagram', () => {
    beforeEach(() => {
      cy.visit('/');
    });

    it('should navigate to Instagram page', () => {
      cy.get('button').contains('Instagram').should('be.visible').click();
      cy.get('button').contains('Kommentare').should('be.visible').click();
      cy.get('[role="treeitem"]')
        .contains('Offen')
        .should('be.visible')
        .click();
      cy.url().should('include', '/instagram/comments');
      cy.contains('h1', 'Kommentare').should('be.visible');
    });

    it('should have the toggle button enabled by default', () => {
      cy.navigateToInstagramComments();

      cy.get('button[role="switch"]')
        .should('be.enabled')
        .should('not.have.attr', 'disabled');
    });
  });
});
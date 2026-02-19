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
          // cy.findInput('username').type(user.name);
          cy.get("input[name='password']").type(user.password);
          cy.get("input[type='submit']").click();
        },
      );

      cy.url({ timeout: 15000 }).should('include', '/dashboard');
      cy.contains('h1', 'Dashboard', { timeout: 15000 }).should('be.visible');
    });
  });

  it('should display dashboard after login', () => {
    cy.visit('/');
    cy.url().should('include', '/dashboard');
    cy.findByRole('heading', { name: 'Dashboard', level: 1 }).should(
      'be.visible',
    );
  });

  describe('Navigate to Instagram', () => {
    beforeEach(() => {
      cy.visit('/');
    });

    it('should navigate to Instagram page', () => {
      cy.findByRole('treeitem', { name: 'Instagram' })
        .should('be.visible')
        .click();
      cy.findByRole('treeitem', { name: 'Kommentare' })
        .should('be.visible')
        .click();
      cy.findByRole('treeitem', { name: /öffentliche Ordner Offen/i })
        .should('be.visible')
        .click();
      cy.url().should('include', '/instagram/comments');
      cy.findByRole('heading', { name: 'Kommentare', level: 1 }).should(
        'be.visible',
      );
    });

    it('should have the toggle button enabled by default', () => {
      cy.navigateToInstagramComments();

      cy.get('button[role="switch"]')
        .should('be.enabled')
        .should('not.have.attr', 'disabled');
    });

    // it('should have the toggle button enabled by default', () => {
    //   const platform = ['instagram', 'facebook', 'tiktok', 'youtube'];
    //   platform.forEach((p) => {
    //     cy.navigateToComments(p);
    //     cy.findByRole('switch')
    //       .should('be.enabled')
    //       .should('have.attr', 'aria-checked', 'true');
    //   });
    //   // cy.navigateToComments('instagram');
    //   // cy.findByRole('switch')
    //   //   .should('be.enabled')
    //   //   .should('have.attr', 'aria-checked', 'true');
    // });
  });
});

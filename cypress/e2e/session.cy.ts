const login = (sessionName: string) => {};

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
      cy.url().should('include', '/dashboard');
      cy.contains('h1', 'Dashboard').should('be.visible');
    });
  });

  it('1 should display dashboard after login', () => {
    cy.visit('/');
    cy.url().should('include', '/dashboard');
    cy.contains('h1', 'Dashboard').should('be.visible');
  });

  it('2 should display dashboard after login', () => {
    cy.visit('/');
    cy.url().should('include', '/dashboard');
    cy.contains('h1', 'Dashboard').should('be.visible');
  });
});

export class LoginPage {
  readonly loginButton = 'Anmelden';

  clickLogin() {
    cy.get('button').contains(this.loginButton).should('be.visible').click();
  }

  loginViaKeycloak() {
    this.clickLogin();

    cy.origin(
      'https://ppa-cmt-app-keycloak-ppa-dev.wonderfulflower-755a37d4.westeurope.azurecontainerapps.io',
      () => {
        const user = Cypress.env('user1');
        cy.get("input[name='username']").type(user.name);
        cy.get("input[name='password']").type(user.password);
        cy.get("input[type='submit']").click();
      },
    );
  }
}

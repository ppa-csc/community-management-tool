import { DashboardPage } from '../support/pages';

let loginAttempt = 0;

describe('Login Test Suite', { retries: { runMode: 2, openMode: 1 } }, () => {
  const dashboardPage = new DashboardPage();

  it('should login and display dashboard', { tags: '@smoke' }, () => {
    loginAttempt += 1;
    cy.log(`Login attempt #${loginAttempt}`);

    cy.loginWithKeycloak();
    cy.visit('/');
    dashboardPage.assertIsLoaded();

    cy.then(() => {
      if (loginAttempt <= 1) {
        throw new Error('Simulated flaky login failure');
      }
    });
  });
});

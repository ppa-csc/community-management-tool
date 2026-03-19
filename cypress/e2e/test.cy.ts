import { DashboardPage } from '../support/pages';

describe('Login Test Suite', () => {
  const dashboardPage = new DashboardPage();

  it('should login and display dashboard', { tags: '@smoke' }, () => {
    cy.loginWithKeycloak();
    cy.visit('/');
    dashboardPage.assertIsLoaded();
  });
});

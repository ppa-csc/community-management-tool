/// <reference types="cypress" />

import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to login via Keycloak with session caching.
       * Uses the LoginPage and DashboardPage POMs internally.
       * @example cy.loginWithKeycloak()
       */
      loginWithKeycloak(): Chainable<void>;
    }
  }
}

Cypress.Commands.add('loginWithKeycloak', () => {
  const loginPage = new LoginPage();
  const dashboardPage = new DashboardPage();

  cy.session('keycloak-session', () => {
    cy.visit('/');
    loginPage.loginViaKeycloak();
    dashboardPage.assertIsLoaded();
  });
});

export {};

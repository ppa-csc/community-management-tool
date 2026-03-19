import { DashboardPage, InstagramCommentsPage } from '../support/pages';

describe('Login Test Suite with Sessions', () => {
  const dashboardPage = new DashboardPage();
  const commentsPage = new InstagramCommentsPage();

  beforeEach(() => {
    cy.loginWithKeycloak();
  });

  it('should display dashboard after login', { tags: '@smoke' }, () => {
    cy.visit('/');
    dashboardPage.assertIsLoaded();
  });

  describe('Navigate to Instagram', () => {
    beforeEach(() => {
      cy.visit('/');
    });

    it(
      'should navigate to Instagram comments page',
      { tags: '@regression' },
      () => {
        commentsPage.navigate();
        commentsPage.assertIsLoaded();
      },
    );

    it(
      'should have the toggle button enabled by default',
      { tags: '@regression' },
      () => {
        commentsPage.navigate();
        commentsPage.assertIsLoaded();
        commentsPage.assertToggleEnabled();
      },
    );
  });
});

import { DashboardPage, InstagramCommentsPage } from '../support/pages';

describe('Instagram Comments Load Time', () => {
  const dashboardPage = new DashboardPage();
  const commentsPage = new InstagramCommentsPage();

  beforeEach(() => {
    cy.loginWithKeycloak();
    commentsPage.interceptCommentsLoad();
    cy.visit('/');
    dashboardPage.assertIsLoaded();
    commentsPage.navigate();
  });

  it(
    'should load comment section with focus mode enabled',
    { tags: '@regression' },
    () => {
      commentsPage.assertCommentCardsOrEmptyState();
    },
  );

  it(
    'should load comments after disabling focus mode',
    { tags: '@regression' },
    () => {
      commentsPage.assertCommentCardsOrEmptyState();
      commentsPage.interceptCommentsLoad();
      commentsPage.toggleFocusMode();
      commentsPage.assertCommentCardsOrEmptyState();
    },
  );
});

import { InstagramPostsPage } from '../support/pages';

describe('Instagram Posts', () => {
  const postsPage = new InstagramPostsPage();

  beforeEach(() => {
    cy.loginWithKeycloak();
    cy.visit('/');
  });

  it('should load all Instagram posts', { tags: '@regression' }, () => {
    postsPage.navigateToAllPosts();
    postsPage.assertIsLoaded();
    postsPage.assertPostListOrEmptyState();
  });

  it(
    'should display a date on the latest post',
    { tags: '@regression' },
    () => {
      postsPage.navigateToAllPosts();
      postsPage.assertPostListVisible();
      postsPage.getLatestPostDate().should('not.be.empty');
    },
  );
});

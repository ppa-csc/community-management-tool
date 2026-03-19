import { InstagramCommentsPage } from '../support/pages';

describe('Instagram Comments', () => {
  const commentsPage = new InstagramCommentsPage();

  beforeEach(() => {
    cy.loginWithKeycloak();
  });

  it(
    'should display empty comment list when there are no comments',
    { tags: '@regression' },
    () => {
      cy.fixture('comments').then((comments) => {
        commentsPage.interceptComments(comments.emptyComments);
      });

      cy.visit('/');
      commentsPage.navigate();

      cy.wait('@getComments');

      commentsPage.assertIsLoaded();
      commentsPage.assertEmptyState();
    },
  );

  it('should display a mocked comment', { tags: '@regression' }, () => {
    cy.fixture('comments').then((comments) => {
      const commentData = comments.singleComment;
      const today = new Date().toISOString();
      commentData.comments[0].createdAt = today;
      commentData.comments[0].modifiedAt = today;

      commentsPage.interceptComments(commentData);
    });

    cy.visit('/');
    commentsPage.navigate();

    cy.wait('@getComments');

    commentsPage.assertIsLoaded();
    commentsPage.assertHasComments();
  });
});

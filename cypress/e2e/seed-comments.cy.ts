import { DashboardPage, InstagramCommentsPage } from '../support/pages';
import { buildInstagramComment, CommentStatus } from '../support/factories';
import type { InstagramCommentEntity } from '../support/factories';
import { containers } from '../support/cosmos/containers';

describe('Seeded Instagram Comments', () => {
  const dashboardPage = new DashboardPage();
  const commentsPage = new InstagramCommentsPage();

  const cosmosConfig = {
    endpoint: Cypress.env('cosmosDb').endpoint as string,
    databaseName: Cypress.env('cosmosDb').databaseName as string,
    containerName: containers.instagram.comments,
  };

  let seededComments: InstagramCommentEntity[] = [];

  beforeEach(() => {
    cy.loginWithKeycloak();
  });

  afterEach(() => {
    if (seededComments.length === 0) return;

    const ids = seededComments.map((c) => ({
      id: c.id,
      partitionKey: c.pageId,
    }));

    cy.task('clearItems', { ...cosmosConfig, ids });
    seededComments = [];
  });

  it(
    'should display a seeded comment in the UI',
    { tags: '@regression' },
    () => {
      const comment = buildInstagramComment({
        text: 'Cypress Seeded Comment',
        status: CommentStatus.Pending,
      });
      seededComments.push(comment);

      cy.task('seedItems', {
        ...cosmosConfig,
        items: [comment],
      });

      commentsPage.interceptCommentsLoad();
      cy.visit('/');
      dashboardPage.assertIsLoaded();
      commentsPage.navigate();
      commentsPage.assertIsLoaded();

      cy.wait('@commentsLoad');

      commentsPage.interceptCommentsLoad();
      commentsPage.toggleFocusMode();

      cy.wait('@commentsLoad');

      cy.contains('Cypress Seeded Comment').should('be.visible');
    },
  );
});

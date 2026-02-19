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

      cy.url({ timeout: 15000 }).should('include', '/dashboard');
      cy.contains('h1', 'Dashboard', { timeout: 15000 }).should('be.visible');
    });
  });

  it('should display empty comment list when there are no comments', () => {
    cy.intercept('GET', '**/api/v1/comments/direct?*', {
      statusCode: 200,
      body: {
        data: [],
        totalCommentsCount: 0,
        comments: [],
        highlightedCommentIds: [],
        page: 1,
        pageSize: 1000,
        totalPages: 0,
      },
    }).as('getComments');

    cy.visit('/');

    cy.navigateToInstagramComments();

    cy.wait('@getComments');

    cy.url().should('include', '/instagram/comments');
    cy.contains('h1', 'Kommentare').should('be.visible');
    cy.contains('Keine Kommentare gefunden').should('be.visible');
  });

  it('should display a mocked comment', () => {
    const today = new Date().toISOString();
    cy.intercept('GET', '**/api/v1/comments/direct?*', {
      statusCode: 200,
      body: {
        data: [
          {
            '27b378e0-b057-4fdd-b762-8209911a2218': [],
          },
        ],
        totalCommentsCount: 1,
        comments: [
          {
            commentProperties: ['unpinned', 'visible'],
            id: '1',
            threadId: '1',
            parentId: '0',
            user: {
              id: 0,
              externalId: '2',
              profilePictureUrl: '',
              userName: 'Dummy User',
              realName: 'Dummy User',
              email: '',
              followerscCount: 0,
            },
            post: {
              id: 'post_1',
              externalId: '2',
              teaser: 'Dummy Post',
            },
            text: '#test',
            tags: [
              {
                name: 'hashtag',
                markupElements: ['#test'],
                score: 100,
              },
              {
                name: 'unsafe',
                markupElements: [],
                score: 100,
              },
            ],
            labelIds: [],
            createdAt: today,
            modifiedAt: today,
            status: 'pending',
            children: [],
            unsafetyScore: 100,
            isUnsafe: true,
            unsafetyReason: '',
            similarCommentHash:
              'v1:95a54c5b220848cdd6ba2371d4f842ac7625f1eee9bc843ee550846b96a12730',
            similarComment: false,
          },
        ],
        highlightedCommentIds: ['1'],
        page: 1,
        pageSize: 1000,
        totalPages: 1,
      },
    }).as('getComments');

    cy.visit('/');

    cy.navigateToInstagramComments();

    cy.wait('@getComments');

    cy.url().should('include', '/instagram/comments');
    cy.contains('h1', 'Kommentare').should('be.visible');
    cy.contains('Keine Kommentare gefunden').should('not.exist');
  });
});

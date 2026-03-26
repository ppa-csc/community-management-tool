export class InstagramPostsPage {
  readonly platform = 'Instagram';
  readonly url = '/instagram/posts';
  readonly heading = 'Posts';
  readonly postCardSelector =
    'div.flex.flex-row.rounded-xl.p-6.shadow-postlist-card-shadow.cursor-pointer.gap-10';
  readonly emptyStateText = 'Keine Posts gefunden';

  navigate() {
    cy.findByRole('treeitem', { name: this.platform })
      .should('be.visible')
      .click();

    cy.findByRole('treeitem', { name: this.heading })
      .should('be.visible')
      .click();
  }

  navigateToAllPosts() {
    this.navigate();
    cy.get('a[href="/instagram/posts/all"]').should('be.visible').click();
  }

  navigateToOpenPosts() {
    this.navigate();
    cy.get('a[href="/instagram/posts/open?vb=visible&stf=any&st=pending"]')
      .should('be.visible')
      .click();
  }

  assertIsLoaded() {
    cy.url().should('include', this.url);
    cy.findByRole('heading', { name: this.heading, level: 1 }).should(
      'be.visible',
    );
  }

  assertPostListVisible(timeout = 30000) {
    cy.get(this.postCardSelector, { timeout }).should('be.visible');
  }

  assertPostListOrEmptyState(timeout = 30000) {
    cy.get('body', { timeout }).should(($body) => {
      const hasEmptyState = $body.text().includes(this.emptyStateText);
      const hasPosts = $body.find(this.postCardSelector).length > 0;
      expect(hasEmptyState || hasPosts).to.be.true;
    });
  }

  getLatestPostDate() {
    return cy.get('div.text-ppa-grey').first().invoke('text');
  }
}

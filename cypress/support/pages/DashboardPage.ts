export class DashboardPage {
  readonly url = '/dashboard';
  readonly heading = 'Dashboard';

  assertIsLoaded(timeout = 15000) {
    cy.url({ timeout }).should('include', this.url);
    cy.findByRole('heading', { name: this.heading, level: 1 }).should(
      'be.visible',
    );
  }
}

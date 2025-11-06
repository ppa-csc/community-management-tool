describe('Example Test Suite', () => {
  beforeEach(() => {
    // Visit a page before each test
    // Update this URL to match your application
    cy.visit('https://example.cypress.io');
  });

  it('should display the correct title', () => {
    cy.title().should('include', 'Kitchen Sink');
  });

  it('should navigate and interact with elements', () => {
    cy.contains('type').click();
    cy.url().should('include', '/commands/actions');

    // Test typing into an input
    cy.get('.action-email')
      .type('test@example.com')
      .should('have.value', 'test@example.com');
  });

  it('should load fixture data', () => {
    cy.fixture('example').then((data) => {
      expect(data).to.have.property('example');
      expect(data.example.email).to.equal('hello@cypress.io');
    });
  });

  // Example using custom command
  it('should use custom dataCy command', () => {
    // This assumes you have elements with data-cy attributes
    // cy.dataCy('my-element').should('be.visible');
  });
});

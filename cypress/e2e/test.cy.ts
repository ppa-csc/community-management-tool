describe("Test Suite", () => {
  beforeEach(() => {
    // Visit a page before each test
    // Update this URL to match your application
    cy.visit("/");
  })
  it("should display the correct title", () => {
    cy.get("button").contains("Anmelden").should("be.visible").click();
    cy.origin("https://ppa-cmt-app-keycloak-ppa-dev.wonderfulflower-755a37d4.westeurope.azurecontainerapps.io/realms/CMT2/protocol/openid-connect/auth", () => {
      const users = Cypress.env("user1");
      cy.get("input[name='username']").click().type(users.name);
      cy.get("input[name='password']").click().type(users.password);
      cy.get("input[type='submit']").click();
    })
    // hier weitermachen
    cy.url().should("include", "/dashboard");
    cy.contains("h1", "Dashboard").should("be.visible");
    });
  });
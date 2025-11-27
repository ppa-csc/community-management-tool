# Cypress Playground

Cypress E2E tests with TypeScript and pnpm.

## Commands

- `pnpm install` - Install dependencies
- `pnpm cypress:open` - Open Cypress Test Runner
- `pnpm cypress:run` - Run Cypress tests headlessly
- `pnpm test` - Run tests headlessly (alias)

## Authentication

Uses Keycloak for authentication with `cy.origin()` for cross-origin testing.

### Environment Variables

User credentials in `cypress.env.json`:

```json
{
  "user1": {
    "name": "username",
    "password": "password"
  }
}
```

### Keycloak Login Pattern

```typescript
cy.origin("https://your-keycloak-url", () => {
  const user = Cypress.env("user1");
  cy.get("input[name='username']").type(user.name);
  cy.get("input[name='password']").type(user.password);
  cy.get("input[type='submit']").click();
});
```

Or use the custom command:

```typescript
cy.loginWithKeycloak();
```

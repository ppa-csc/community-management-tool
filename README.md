# Cypress Playground

Cypress E2E tests with TypeScript, pnpm, and Keycloak authentication.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [pnpm](https://pnpm.io/)

## Setup

```bash
pnpm install
```

## Commands

```bash
pnpm cypress:open  # Open Cypress Test Runner
pnpm cypress:run   # Run tests headlessly
pnpm test          # Alias for cypress:run
```

## Project Structure

```
cypress/
├── e2e/           # Test files (*.cy.ts)
├── fixtures/      # Test data
└── support/
    ├── commands.ts  # Custom commands
    └── e2e.ts       # Support file
```

## Authentication

Uses Keycloak with `cy.origin()` for cross-origin login. User credentials are configured in `cypress.env.json`:

```json
{
  "user1": {
    "name": "username",
    "password": "password"
  }
}
```

## Custom Commands

### `cy.dataCy(value)`

Select elements by `data-cy` attribute:

```typescript
cy.dataCy("submit-button").click();
```

### `cy.loginWithKeycloak()`

Login via Keycloak with session caching:

```typescript
cy.loginWithKeycloak();
```

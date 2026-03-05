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

All commands automatically use Chrome as the default browser.

```bash
pnpm cypress:open  # Open Cypress Test Runner in Chrome
pnpm cypress:run   # Run tests headlessly in Chrome
pnpm test          # Alias for cypress:run
```

## Project Structure

```
cypress/
├── e2e/                    # Test files (*.cy.ts)
│   ├── intercept.cy.ts    # API interception tests
│   ├── session.cy.ts      # Session & navigation tests
│   └── test.cy.ts
├── fixtures/              # Test data (JSON)
│   └── comments.json      # Mock comment data
└── support/
    ├── commands.ts        # Imports all custom commands
    ├── e2e.ts             # Support file
    └── commands/          # Custom command definitions
        ├── dataCy.ts
        ├── findInput.ts
        ├── loginWithKeycloak.ts
        ├── navigateToComments.ts
        └── navigateToInstagramComments.ts
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
cy.dataCy('submit-button').click();
```

### `cy.loginWithKeycloak()`

Login via Keycloak with session caching:

```typescript
cy.loginWithKeycloak();
```

### `cy.findInput(name)`

Find input element by name attribute:

```typescript
cy.findInput('username').type('user');
```

### `cy.navigateToInstagramComments()`

Navigate to Instagram comments page:

```typescript
cy.navigateToInstagramComments();
```

### `cy.navigateToComments(platform)`

Navigate to comments page for any platform (case-insensitive):

```typescript
cy.navigateToComments('instagram');
cy.navigateToComments('facebook');
cy.navigateToComments('tiktok');
cy.navigateToComments('youtube');
```

## Test Data

Test data is stored in `cypress/fixtures/` for better maintainability:

```typescript
cy.fixture('comments').then((comments) => {
  cy.intercept('GET', '**/api/v1/comments/direct?*', {
    statusCode: 200,
    body: comments.emptyComments,
  });
});
```

Available fixtures:

- `comments.json` - Mock comment data (empty and single comment scenarios)

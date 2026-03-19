# Cypress Playground

Cypress E2E tests with TypeScript, pnpm, and Keycloak authentication.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [pnpm](https://pnpm.io/)
- [Docker](https://www.docker.com/) (optional, for containerized runs)

## Setup

```bash
pnpm install
```

## Commands

All commands automatically use Chrome as the default browser.

```bash
pnpm cypress:open      # Open Cypress Test Runner in Chrome
pnpm cypress:run       # Run tests headlessly in Chrome
pnpm test              # Alias for cypress:run
pnpm test:smoke        # Run only @smoke tests
pnpm test:regression   # Run only @regression tests
pnpm test:docker       # Run tests in Docker (no local dependencies needed)
```

## Test Tagging

Tests are tagged with `@smoke` or `@regression` using [`@cypress/grep`](https://github.com/cypress-io/cypress/tree/develop/npm/grep).

```typescript
it('should login', { tags: '@smoke' }, () => { ... });
it('should display comments', { tags: '@regression' }, () => { ... });
```

Run a subset:

```bash
pnpm test:smoke
pnpm test:regression
```

Or use `--env grepTags` directly for custom combinations:

```bash
pnpm cypress:run --env grepTags="@smoke+@regression"
```

| Tag           | Purpose                                                    |
| ------------- | ---------------------------------------------------------- |
| `@smoke`      | Critical path — login, dashboard load                      |
| `@regression` | Full feature coverage — navigation, intercepts, assertions |

## Docker

Run the full test suite in a container — no local Node.js or Cypress install required.

### Prerequisites

- [Docker](https://www.docker.com/) (with Docker Compose)

### Usage

```bash
pnpm test:docker
```

This builds the image, runs all specs headlessly, and maps screenshots/videos back to your host.

To override the base URL (e.g. for staging):

```bash
CYPRESS_BASE_URL=https://staging.example.com pnpm test:docker
```

Screenshots and videos are written to `cypress/screenshots/` and `cypress/videos/` on your host via volume mounts.

## Project Structure

```
cypress/
├── e2e/                          # Test files (*.cy.ts)
│   ├── instagram-comments.cy.ts  # Instagram comments with API intercepts
│   ├── session.cy.ts             # Session-based login & navigation tests
│   └── test.cy.ts                # Basic login smoke test
├── fixtures/                     # Test data (JSON)
│   └── comments.json             # Mock comment data
└── support/
    ├── commands.ts               # Imports all custom commands
    ├── e2e.ts                    # Support file (loaded before every spec)
    ├── index.d.ts                # Global type declarations
    ├── commands/                 # Custom Cypress commands
    │   ├── dataCy.ts
    │   ├── findInput.ts
    │   ├── loginWithKeycloak.ts
    │   ├── navigateToComments.ts
    │   └── navigateToInstagramComments.ts
    └── pages/                    # Page Object Model (POM) classes
        ├── index.ts              # Barrel export
        ├── LoginPage.ts
        ├── DashboardPage.ts
        └── InstagramCommentsPage.ts
```

## Page Object Model (POM)

Page objects encapsulate selectors and interactions for each page, keeping tests readable and maintainable.

```typescript
import { DashboardPage, InstagramCommentsPage } from '../support/pages';

const dashboardPage = new DashboardPage();
const commentsPage = new InstagramCommentsPage();

dashboardPage.assertIsLoaded();
commentsPage.navigate();
commentsPage.assertEmptyState();
commentsPage.interceptComments(fixtureData);
```

| Page Object             | Responsibility                                                |
| ----------------------- | ------------------------------------------------------------- |
| `LoginPage`             | "Anmelden" button click and Keycloak `cy.origin()` login flow |
| `DashboardPage`         | Assert dashboard URL and heading                              |
| `InstagramCommentsPage` | Sidebar navigation, comment assertions, API intercept helper  |

## Authentication

Uses Keycloak with `cy.origin()` for cross-origin login. Sessions are cached via `cy.session()` so the login flow runs only once per spec file.

User credentials are configured in `cypress.env.json` (not committed):

```json
{
  "user1": {
    "name": "username",
    "password": "password"
  }
}
```

### Login in Tests

Use the reusable `cy.loginWithKeycloak()` command — it handles the full Keycloak flow with session caching:

```typescript
beforeEach(() => {
  cy.loginWithKeycloak();
});
```

## Custom Commands

### `cy.loginWithKeycloak()`

Login via Keycloak with session caching. Uses `LoginPage` and `DashboardPage` POMs internally.

### `cy.dataCy(value)`

Select elements by `data-cy` attribute:

```typescript
cy.dataCy('submit-button').click();
```

### `cy.findInput(name)`

Find input element by name attribute:

```typescript
cy.findInput('username').type('user');
```

### `cy.navigateToComments(platform)`

Navigate to comments page for any platform:

```typescript
cy.navigateToComments('instagram');
cy.navigateToComments('facebook');
```

### `cy.navigateToInstagramComments()`

Shortcut to navigate to the Instagram comments page.

## Test Data

Test fixtures live in `cypress/fixtures/` and are loaded with `cy.fixture()`:

```typescript
cy.fixture('comments').then((comments) => {
  commentsPage.interceptComments(comments.emptyComments);
});
```

Available fixtures:

- `comments.json` — empty and single comment scenarios

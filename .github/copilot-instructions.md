# Cypress Playground

Cypress E2E tests with TypeScript and pnpm.

## Commands

- `pnpm install` — Install dependencies
- `pnpm cypress:open` — Open Cypress Test Runner
- `pnpm cypress:run` — Run Cypress tests headlessly
- `pnpm test` — Run tests headlessly (alias)
- `pnpm test:smoke` — Run only `@smoke` tests
- `pnpm test:regression` — Run only `@regression` tests
- `pnpm test:docker` — Run tests in Docker (no local dependencies needed)
- `pnpm format` — Format all files with Prettier
- `pnpm format:check` — Check formatting without modifying files

## Code Style

### Formatting

- Uses **Prettier** for consistent formatting (see `.prettierrc`).
- Single quotes, semicolons, trailing commas, 80-char print width, 2-space indentation.

### Comments

- **Do not write inline comments.** The code should be self-explanatory through clear naming.
- If a comment is truly unavoidable, it must explain **why** something is done, never **what** is happening.
  - ✅ `// Keycloak redirects lose the session cookie without this flag`
  - ❌ `// Click the login button`
  - ❌ `// Navigate to comments page`

### General

- Use TypeScript strict mode.
- Prefer `readonly` properties in Page Object classes.
- Use `cy.findByRole()` (Testing Library) over raw `cy.get()` selectors where possible.
- Use `data-cy` attributes as a fallback for selecting elements without accessible roles.

## Architecture

### Page Object Model (POM)

All page interactions and selectors live in Page Object classes under `cypress/support/pages/`.

- One class per page or major component.
- Selectors are `readonly` properties, not hardcoded in methods.
- Methods are named with clear verbs: `navigate()`, `assertIsLoaded()`, `interceptCommentsLoad()`.
- Tests import POMs from the barrel export: `import { DashboardPage } from '../support/pages';`

#### Available Page Objects

| Page Object             | File                       | Responsibility                                                    |
| ----------------------- | -------------------------- | ----------------------------------------------------------------- |
| `LoginPage`             | `LoginPage.ts`             | "Anmelden" button click and Keycloak `cy.origin()` login flow     |
| `DashboardPage`         | `DashboardPage.ts`         | Assert dashboard URL and heading                                  |
| `InstagramCommentsPage` | `InstagramCommentsPage.ts` | Comment navigation, focus mode toggle, API intercept, empty state |
| `InstagramPostsPage`    | `InstagramPostsPage.ts`    | Post navigation (all/open), post list assertions, empty state     |

### Empty State Handling

Lists (comments, posts) can be empty in production — this is not a bug. Page Objects provide two assertion strategies:

- **Strict:** `assertCommentCardsVisible()` / `assertPostListVisible()` — expects content to exist. Use when the test specifically needs items (e.g. checking a date).
- **Tolerant:** `assertCommentCardsOrEmptyState()` / `assertPostListOrEmptyState()` — passes whether items exist or the empty state message is shown. Use for general "page loaded successfully" checks.

For comments, the tolerant assertion uses `cy.wait()` on an intercepted API response and inspects the response body to decide which DOM state to expect. This avoids race conditions with transient empty states during loading.

```typescript
commentsPage.interceptCommentsLoad();
cy.visit('/');
commentsPage.navigate();
commentsPage.assertCommentCardsOrEmptyState();
```

### Custom Commands

Reusable Cypress commands live in `cypress/support/commands/`. Each command file declares its own types.

### Authentication

Uses Keycloak for authentication with `cy.origin()` for cross-origin testing.

#### Environment Variables

User credentials in `cypress.env.json`:

```json
{
  "user1": {
    "name": "username",
    "password": "password"
  }
}
```

#### Login

Use the reusable command — never inline the Keycloak flow in tests:

```typescript
cy.loginWithKeycloak();
```

### Docker

Tests can run in Docker via `pnpm test:docker`. The `Dockerfile` uses `cypress/included` and `docker-compose.yml` handles volume mounts for screenshots/videos and injects `cypress.env.json`.

### Test Tagging

Tests are tagged with `@smoke` or `@regression` via `@cypress/grep`. Always tag new tests:

- `@smoke` — critical path (login, dashboard load)
- `@regression` — full feature coverage (navigation, intercepts, assertions)

```typescript
it('should login', { tags: '@smoke' }, () => { ... });
it('should display comments', { tags: '@regression' }, () => { ... });
```

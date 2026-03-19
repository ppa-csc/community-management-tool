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

## Code Style

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
- Methods are named with clear verbs: `navigate()`, `assertIsLoaded()`, `interceptComments()`.
- Tests import POMs from the barrel export: `import { DashboardPage } from '../support/pages';`

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

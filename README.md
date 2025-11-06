# Cypress TypeScript Boilerplate Template

A clean, minimal boilerplate for quickly starting Cypress E2E tests with TypeScript and pnpm.

## 🚀 Features

- ✅ **Cypress 15.5.0** - Latest version for E2E testing
- ✅ **TypeScript 5.9.3** - Type-safe test writing
- ✅ **pnpm** - Fast, disk space efficient package manager
- ✅ **Custom Commands** - Pre-configured custom commands with TypeScript support
- ✅ **Example Tests** - Sample test suite to get started quickly
- ✅ **Fixtures** - Example fixture data setup

## 📋 Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [pnpm](https://pnpm.io/) (v8 or higher)

## 🛠️ Installation

```bash
# Install dependencies
pnpm install
```

## 🏃 Usage

### Open Cypress Test Runner (Interactive Mode)

```bash
pnpm cypress:open
```

This opens the Cypress Test Runner where you can:

- Choose between E2E Testing and Component Testing
- Select a browser
- Run tests interactively with live reloading

### Run Tests Headlessly (CI Mode)

```bash
pnpm cypress:run
# or
pnpm test
```

This runs all tests in headless mode, perfect for CI/CD pipelines.

## 📁 Project Structure

```
CypressBoilerplateTemplate/
├── cypress/
│   ├── e2e/                    # E2E test files
│   │   └── example.cy.ts       # Example test suite
│   ├── fixtures/               # Test data fixtures
│   │   └── example.json        # Example fixture data
│   └── support/
│       ├── commands.ts         # Custom Cypress commands
│       └── e2e.ts             # Support file loaded before tests
├── cypress.config.ts           # Cypress configuration
├── tsconfig.json              # TypeScript configuration
└── package.json               # Project dependencies and scripts
```

## ✨ Custom Commands

This boilerplate includes example custom commands in `cypress/support/commands.ts`:

### `cy.dataCy(value)`

Select elements by `data-cy` attribute:

```typescript
cy.dataCy("submit-button").click();
```

### `cy.login(email, password)`

Custom login command with session management:

```typescript
cy.login("user@example.com", "password123");
```

## 📝 Writing Tests

Create new test files in the `cypress/e2e/` directory with the `.cy.ts` extension:

```typescript
describe("My Feature", () => {
  beforeEach(() => {
    cy.visit("https://your-app.com");
  });

  it("should do something", () => {
    cy.get("button").click();
    cy.url().should("include", "/success");
  });
});
```

## ⚙️ Configuration

### Cypress Configuration (`cypress.config.ts`)

Key settings:

- `baseUrl`: Default base URL for `cy.visit()`
- `viewportWidth/Height`: Default viewport size
- `video`: Video recording on/off
- `screenshotOnRunFailure`: Auto-screenshot on test failure

### TypeScript Configuration (`tsconfig.json`)

Configured for:

- ES2022 target
- Strict mode enabled
- Cypress and Node type definitions

## 🔧 Customization

1. **Update Base URL**: Modify `baseUrl` in `cypress.config.ts` to match your application
2. **Add Custom Commands**: Extend `cypress/support/commands.ts` with your own commands
3. **Configure Fixtures**: Add test data to `cypress/fixtures/`
4. **Adjust Viewport**: Change default viewport in `cypress.config.ts`

## 📚 Resources

- [Cypress Documentation](https://docs.cypress.io/)
- [Cypress TypeScript Guide](https://docs.cypress.io/guides/tooling/typescript-support)
- [pnpm Documentation](https://pnpm.io/)

## 🤝 Contributing

Feel free to customize this boilerplate for your specific needs!

## 📄 License

ISC

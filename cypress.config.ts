import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "https://ppacmt2websitedev.z6.web.core.windows.net",
    specPattern: "cypress/e2e/**/*.cy.ts",
    supportFile: "cypress/support/e2e.ts",
  },
  viewportWidth: 1280,
  viewportHeight: 720,
  video: false,
  screenshotOnRunFailure: true,
});

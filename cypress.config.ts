import { defineConfig } from 'cypress';
import { plugin as grepPlugin } from '@cypress/grep/plugin';
import {
  seedItems,
  clearItems,
  queryItems,
} from './cypress/support/tasks/cosmosdb';

export default defineConfig({
  e2e: {
    baseUrl: 'https://ppacmt2websitedev.z6.web.core.windows.net',
    specPattern: 'cypress/e2e/**/*.cy.ts',
    supportFile: 'cypress/support/e2e.ts',
    setupNodeEvents(on, config) {
      grepPlugin(config);

      on('task', {
        seedItems,
        clearItems,
        queryItems,
      });

      return config;
    },
  },
  viewportWidth: 1280,
  viewportHeight: 720,
  video: false,
  screenshotOnRunFailure: true,
  // Set Chrome as the default browser
  chromeWebSecurity: false,
});

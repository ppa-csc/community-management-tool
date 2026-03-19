// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

/// <reference path="./index.d.ts" />

// Import commands.js using ES2015 syntax:
import './commands';
import '@testing-library/cypress/add-commands';
import { register as registerGrep } from '@cypress/grep';

registerGrep();

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Global exception handler to prevent test failures from uncaught exceptions
Cypress.on('uncaught:exception', (err, runnable) => {
  // Return false to prevent the test from failing
  return false;
});

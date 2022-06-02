/* eslint-disable no-undef */
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add('login', (server) => {
  cy.fixture('validAuth').then((auth) => {
    server.create('auth', auth);
    cy.get('[data-testid="email-input"]')
      .type(auth.email);

    cy.get('[data-testid="password-input"]')
      .type(auth.password);

    cy.get('[data-testid="login-action"]')
      .click();
  });
});

Cypress.Commands.add('fillContacts', (server) => {
  cy.fixture('testContacts').then((contacts) => {
    contacts.forEach(async (contact) => {
      server.create('contact', contact);
    });
  });
});

Cypress.Commands.add('checkSort', (key) => {
  cy.fixture('testContacts').then((contacts) => {
    contacts.sort((a, b) => {
      if (typeof a[key] === 'string') {
        return b[key].localeCompare(a[key]);
      }

      return b[key] - a[key];
    });

    cy.get(`[data-testid="sort-${key}"]`)
      .click();

    cy.get(`[data-testid="table-item-${key}"]`)
      .first()
      .should('have.text', contacts[0][key]);

    cy.get(`[data-testid="sort-${key}"]`)
      .click();

    cy.get(`[data-testid="table-item-${key}"]`)
      .first()
      .should('have.text', contacts.at(-1)[key]);
  });
});

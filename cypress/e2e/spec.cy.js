/* eslint-disable no-undef */
import { makeServer } from '../../src/server/mirageServer';
import formatPhoneNumber from '../../src/utils/functions/formatPhoneNumber';

let server;
beforeEach(() => {
  server = makeServer({ environment: 'test' });
  cy.visit('http://localhost:3000');
});
afterEach(() => {
  server.shutdown();
});

describe.skip('1.When entering login page.', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });
  it('shows error message when if user is wrong', () => {
    cy.get('[data-testid="email-input"]')
      .type('123');

    cy.get('[data-testid="password-input"]')
      .type('321');

    cy.get('[data-testid="login-action"]')
      .click();

    cy.get('[data-testid="login-error-message"]')
      .should('have.text', 'Credenciais inválidas.');
  });
  it('should redirect to dashboard if user is right', () => {
    cy.login(server);

    cy.url()
      .should('include', '/dashboard');
  });
});

describe('2.When entering the dashboard page.', () => {
  it('returns to login page if entering in the page without login', () => {
    cy.visit('http://localhost:3000/dashboard');
    cy.url()
      .should('not.include', 'dashboard');
  });
  it('display all data if your token is valid', () => {
    cy.fillContacts(server);
    cy.login(server);

    cy.fixture('testContacts').then((contacts) => {
      cy.get('[data-testid="table-item"]')
        .should('have.length', contacts.length);
    });
  });
  it('shows the right order if you sort by id', () => {
    cy.fillContacts(server);
    cy.login(server);

    cy.checkSort('id');
  });
  it('shows the right order if you sort by phone number', () => {
    cy.fillContacts(server);
    cy.login(server);
    cy.fixture('testContacts').then((contacts) => {
      contacts.sort((a, b) => b.mobile - a.mobile);

      cy.get('[data-testid="sort-mobile"]')
        .click();

      cy.get('[data-testid="table-item-mobile"]')
        .first()
        .should('have.text', formatPhoneNumber(contacts[0].mobile));

      cy.get('[data-testid="sort-mobile"]')
        .click();

      cy.get('[data-testid="table-item-mobile"]')
        .first()
        .should('have.text', formatPhoneNumber(contacts.at(-1).mobile));
    });
  });
  it('shows the right order if you sort by email', () => {
    cy.fillContacts(server);
    cy.login(server);

    cy.checkSort('email');
  });
  it('shows the right order if you sort by name', () => {
    cy.fillContacts(server);
    cy.login(server);

    cy.checkSort('name');
  });
  it('deletes user when you click in the button', () => {
    cy.fillContacts(server);
    cy.login(server);

    cy.get('[data-testid="delete-item"]')
      .first()
      .click();

    cy.fixture('testContacts').then((contacts) => {
      cy.get('[data-testid="table-item"]')
        .should('have.length', contacts.length - 1);
    });
  });
  it('redirects to new page when you click in the button to add new contact', () => {
    cy.fillContacts(server);
    cy.login(server);

    cy.get('[data-testid="add-contact-action"]')
      .click();

    cy.url()
      .should('include', '/dashboard/add');
  });
  it('redirects to previous page when clicking the button in header', () => {
    cy.fillContacts(server);
    cy.login(server);

    cy.get('[data-testid="go-back-action"]')
      .click();

    cy.url()
      .should('not.include', '/dashboard');
  });
});

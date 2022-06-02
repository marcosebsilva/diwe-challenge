/* eslint-disable no-undef */
import { makeServer } from '../../src/server/mirageServer';
import formatPhoneNumber from '../../src/utils/functions/formatPhoneNumber';

describe('2.When entering the dashboard page.', () => {
  let server;
  before(() => {
    server = makeServer({ environment: 'test' });
    cy.visit('http://localhost:3000');
    cy.fillContacts(server);
    cy.login(server);
  });

  after(() => {
    server.shutdown();
  });
  it('display all data if your token is valid', () => {
    cy.fixture('testContacts').then((contacts) => {
      cy.get('[data-testid="table-item"]')
        .should('have.length', contacts.length);
    });
  });
  it('shows the right order if you sort by id', () => {
    cy.checkSort('id');
  });
  it('shows the right order if you sort by phone number', () => {
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
    cy.checkSort('email');
  });
  it('shows the right order if you sort by name', () => {
    cy.checkSort('name');
  });
  it('deletes user when you click in the button', () => {
    cy.get('[data-testid="delete-item"]')
      .first()
      .click();

    cy.fixture('testContacts').then((contacts) => {
      cy.get('[data-testid="table-item"]')
        .should('have.length', contacts.length - 1);
    });
  });
  it('redirects to new page when you click in the button to add new contact', () => {
    cy.get('[data-testid="go-to-add-contact"]')
      .click();

    cy.url()
      .should('include', '/dashboard/add');
  });
  it('redirects to previous page when clicking the button in header', () => {
    cy.get('[data-testid="go-back"]')
      .click();

    cy.url()
      .should('not.include', '/add');
  });
  it('returns to login page if entering in the page without login', () => {
    cy.reload();
    cy.url()
      .should('not.include', 'dashboard');
  });
});

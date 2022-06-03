/* eslint-disable no-undef */
import { makeServer } from '../../src/server/mirageServer';
import formatPhoneNumber from '../../src/utils/functions/formatPhoneNumber';
import validAuth from '../fixtures/validAuth.json';

describe('1.When entering login page.', () => {
  let server;
  beforeEach(() => {
    server = makeServer({ environment: 'test' });
    cy.visit('http://localhost:3000');
  });
  afterEach(() => {
    server.shutdown();
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

describe('3.When using the edit feature', () => {
  let server;
  beforeEach(() => {
    server = makeServer({ environment: 'test' });
    cy.visit('http://localhost:3000');
    cy.fillContacts(server);
    cy.login(server);
  });

  afterEach(() => {
    server.shutdown();
  });
  it('disables edit buttons when user is being edited', () => {
    cy.get('[data-testid="edit-user"]')
      .first()
      .click();

    cy.get('[data-testid="edit-user"]')
      .each((item) => {
        cy.wrap(item)
          .should('be.disabled');
      });
  });
  it('it is possible to edit a user', () => {
    const newEmail = 'newcoolemail@gmail.com';
    cy.get('[data-testid="edit-user"]')
      .first()
      .click();

    cy.get('[data-testid="edit-email-input"]')
      .should('have.length', 1)
      .clear()
      .type(newEmail);

    cy.get('[data-testid="confirm-edit-user"]')
      .click();

    cy.contains('td', newEmail);
  });
  it('is possible to cancel a user editing', () => {
    cy.get('[data-testid="edit-user"]')
      .first()
      .click();
    cy.get('[data-testid="cancel-edit-user"]')
      .click();

    cy.get('[data-testid="edit-email-input"]').should('not.exist');
  });
});

describe('4.When entering the add contact page', () => {
  let server;
  before(() => {
    server = makeServer({ environment: 'test' });
    cy.visit('http://localhost:3000');
    cy.fillContacts(server);
    cy.login(server);
    cy.get('[data-testid="go-to-add-contact"]')
      .click();
  });

  beforeEach(() => {
    cy.get('[data-testid="add-contact-phone-input"]')
      .clear();
    cy.get('[data-testid="add-contact-name-input"]')
      .clear();

    cy.get('[data-testid="add-contact-email-input"]')
      .clear();
  });
  after(() => {
    server.shutdown();
  });
  it('doesnt allow to create a new user with invalid email', () => {
    cy.fillAddContactForm({ invalidEmail: true });

    cy.get('[data-testid="add-contact-form"] :invalid').should('have.length', 1);
  });
  it('doesnt allow to create a new user with invalid name', () => {
    cy.fillAddContactForm({ invalidName: true });

    cy.get('[data-testid="add-contact-form"] :invalid').should('have.length', 1);
  });
  it('doesnt allow to create a new user with invalid phone number', () => {
    cy.fillAddContactForm({ invalidPhone: true });

    cy.get('[data-testid="add-contact-form"] :invalid').should('have.length', 1);
  });
  it('show error message if unauthorized user tries to register a contact', () => {
    server.schema.auths.all().destroy();
    cy.fillAddContactForm();

    cy.get('[data-testid="add-contact-button"]')
      .click();

    cy.get('[data-testid="add-contact-feedback"]')
      .should('have.text', 'Algo deu errado ao cadastrar o usuário.');
  });
  it('allow to create a new user with all valid data', () => {
    server.schema.auths.create(validAuth);
    cy.fillAddContactForm();

    cy.get('[data-testid="add-contact-button"]')
      .click();

    cy.get('[data-testid="add-contact-feedback"]')
      .should('have.text', 'Usuário cadastrado com sucesso!');
  });
});

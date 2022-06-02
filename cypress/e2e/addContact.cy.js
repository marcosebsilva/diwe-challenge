/* eslint-disable no-undef */
import { makeServer } from '../../src/server/mirageServer';
import validAuth from '../fixtures/validAuth.json';

describe('When entering the add contact page', () => {
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

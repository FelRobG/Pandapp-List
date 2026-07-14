/// <reference types="cypress" />

describe('PandApp List - Pruebas E2E', () => {

  // ---------- REGISTRO ----------
  describe('Registro', () => {

    beforeEach(() => {
      cy.clearLocalStorage();
      cy.clearCookies();
      cy.window().then((win) => {
        win.indexedDB.deleteDatabase('_ionicstorage');
        win.indexedDB.deleteDatabase('localforage');
      });
      cy.visit('/registro');
    });

    it('debe mostrar la página de registro', () => {
      cy.url().should('include', 'registro');
    });

    it('debe mostrar error con email inválido', () => {
      cy.get('ion-input').eq(0).type('usuario1');
      cy.get('ion-input').eq(1).type('1234');
      cy.get('ion-input').eq(2).type('1234');
      cy.get('ion-input').eq(3).type('emailinvalido');
      cy.get('ion-input').eq(4).type('56912345678');
      cy.contains('Registrar').click();
      cy.get('ion-alert').should('be.visible');
    });

  });

  // ---------- LOGIN ----------
  describe('Login', () => {

    beforeEach(() => {
      cy.visit('/');
    });

    it('debe mostrar la página de login', () => {
      cy.url().should('include', 'login');
    });

    it('debe evitar viajar a menu-tarjetas con usuario inválido', () => {
      cy.get('ion-input[placeholder="Ingresa tu usuario"]')
        .type('as');
      cy.get('ion-input[placeholder="****"]')
        .type('1234');
      cy.contains('Ingresar🐾').click();
      cy.url().should('not.include', 'menu-tarjetas');
    });

    it('debe navegar a menu-tarjetas con credenciales correctas', () => {
      cy.get('ion-input[placeholder="Ingresa tu usuario"]')
        .type('pepito');
      cy.get('ion-input[placeholder="****"]')
        .type('1234');
      cy.contains('Ingresar🐾').click();
      cy.url({ timeout: 10000}).should('include', 'menu-tarjetas');
    });

  });


  // ---------- PAGE NOT FOUND ----------
  describe('Page Not Found', () => {

    beforeEach(() => {
      cy.clearLocalStorage();
      cy.clearCookies();
      cy.window().then((win) => {
        win.indexedDB.deleteDatabase('_ionicstorage');
        win.indexedDB.deleteDatabase('localforage');
      });
    });

    it('debe mostrar página 404 con ruta inválida', () => {
      cy.visit('/ruta-asd');
      cy.contains('404').should('be.visible');
    });

  });

});
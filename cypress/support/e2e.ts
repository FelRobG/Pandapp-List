Cypress.Commands.add('clearIonicStorage', () => {
  cy.window().then((win) => {
    win.indexedDB.deleteDatabase('_ionicstorage');
    win.indexedDB.deleteDatabase('localforage');
  });
});

Cypress.on('uncaught:exception', (err) => {
  if (err.message.includes('Element attr did not return a valid number')) {
    return false;
  }
});
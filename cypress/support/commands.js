// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

  // // Helper to log in before tests that require auth
  
Cypress.Commands.add('loginUser', (email, password) => {
  
    cy.visit('/');

    // Navigate to profile
    cy.get('a[href="/profile"]').click();

    // Navigate to Login Page
    cy.get('.guest-sign-in-button').click();

    // 1. Fill out the form
    cy.get('input[type="email"]').type(email);
    cy.get('input[type="password"]').type(password);

    // 2. Click Sign In
    cy.get('.login-btn').click();

    // 3. Assert the Custom Popup appears (PopupDialog.jsx)
    cy.get('.modal-box').should('be.visible');
    cy.get('.modal-text').should('contain', 'Welcome back!');

    // 4. Close the popup
    cy.get('.modal-btn').click();

})
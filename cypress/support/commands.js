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
  
Cypress.Commands.add('navigateToLogin', () => {

  cy.visit('/');

  // Navigate to Login
  cy.get('a[href="/profile"]').click();
  cy.contains('Sign In to view profile');
  cy.contains('button', 'Sign In').click();

  
})
 
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
// ...existing code...

Cypress.Commands.add('createFakeEvent', () => {
  // Navigate to profile
  cy.get('a[href="/profile"]').click();

  // Click Create Event Button
  cy.contains('Create an Event').click();

  // Fill form with unique event name (using timestamp to avoid duplicates)
  const eventName = 'Test Event ' + Date.now();
  cy.get('[data-testid="event-title-input"]').type(eventName);
  cy.contains('label', 'Description').parent().find('textarea').type('This is a test event for review testing');
  
  // Click the three Select dropdowns (Category, Date, Time)
  cy.contains('Select').click(); 
  cy.contains('Select').click();
  cy.contains('Select').click();

  // Submit
  cy.contains('button', 'Create Event').click();

  // Handle Success Popup
  cy.get('.modal-box').should('be.visible');
  cy.get('.modal-btn').click();

  // Return to home and verify event was created
  cy.location('pathname', { timeout: 10000 }).should('eq', '/');
  cy.contains(eventName).should('exist');
  
  // Store event name for later use (e.g., for deletion)
  cy.wrap(eventName).as('eventName');
});

Cypress.Commands.add('deleteEvent', () => {
  // Assuming we're on the event detail page
  // Click Delete button (trash icon)
  cy.get('svg.lucide-trash-2').parent('button').click();

  // Confirm Deletion in first Popup
  cy.get('.modal-box').should('be.visible');
  cy.contains('button', 'Yes').click();

  // Close confirmation Popup (OK button)
  cy.get('.modal-box').should('be.visible');
  cy.contains('button', 'OK').click();

  // Verify redirect to home
  cy.location('pathname', { timeout: 10000 }).should('eq', '/');
});

describe('OnlyVibes Event Lifecycle', () => {
  
  // GROUP A: Tests that require Login
  describe('Authenticated Actions', () => {

    // Runs before EVERY test in this file
    beforeEach(() => {
      // Use the command from commands.js
      cy.loginUser('panos@gmail.com', 'panos');
    });

    // --- HAPPY PATH: CREATE ---
    it('Should create an Event', () => {

      // Navigate to profile
      cy.get('a[href="/profile"]').click();

      // Click Create Event Button
      cy.contains('Create an Event').click();

    
      //  Fill form
      cy.get('[data-testid="event-title-input"]').type('Cypress Test Party');
      cy.contains('label', 'Description').parent().find('textarea').type('This is a test description');    
      cy.contains('Select').click(); 
      cy.contains('Select').click();
      cy.contains('Select').click();

      // Submit
      cy.contains('button', 'Create Event').click();

      // Handle Success Popup
      cy.get('.modal-box').should('be.visible');
      cy.get('.modal-btn').click();

      // Verify it appears on feed
      cy.contains('Cypress Test Party').should('exist');
    });

    // --- HAPPY PATH: DELETE ---
    it('Should delete an Event', () => {

      // Click on the event we just created
      cy.contains('Cypress Test Party').click();

      // Click Delete
      cy.get('svg.lucide-trash-2').parent('button').click();

      // Confirm Deletion in Popup
      cy.get('.modal-box').should('be.visible');
      cy.contains('button', 'Yes').click(); // Assuming your popup has a Yes button

      // Alert Popup
      cy.get('.modal-box').should('be.visible');
      cy.contains('button', 'OK').click(); // Assuming your popup has a Yes button

      // 6. Verify it is gone
      cy.contains('Cypress Test Party').should('not.exist');
    });

    // --- UNHAPPY PATH: MISSING TITLE ---
    it('Should NOT create an event without a Title', () => {
      cy.get('a[href="/profile"]').click();
      cy.contains('Create an Event').click();

      // Skip Title -> Fill Description only
      cy.contains('label', 'Description').parent().find('textarea').type('I forgot the title');    
      
      // Select Category
      cy.contains('Select').click(); 
      cy.contains('Select').click();
      cy.contains('Select').click();

      // Attempt Submit
      cy.contains('button', 'Create Event').click();

      // Assert Error Popup appears
      cy.get('.modal-box').should('be.visible');
      cy.contains('Missing').should('be.visible'); 
      
      // Close Popup
      cy.get('.modal-btn').click();
    });

    // --- UNHAPPY PATH: MISSING DESCRIPTION ---
    it('Should NOT create an event without a Description', () => {
      cy.get('a[href="/profile"]').click();
      cy.contains('Create an Event').click();

      // Fill Title -> Skip Description
      cy.get('[data-testid="event-title-input"]').type('Title with no description');
      
      // Select Category
      cy.contains('Select').click(); 
      cy.contains('Select').click();
      cy.contains('Select').click();

      // Attempt Submit
      cy.contains('button', 'Create Event').click();

      // Assert Error Popup appears
      cy.get('.modal-box').should('be.visible');
      cy.contains('Missing').should('be.visible'); 
      
      // Close Popup
      cy.get('.modal-btn').click();
    });

  });

  // GROUP B: Tests for Guests
  describe('Guest Actions', () => {

    beforeEach(() => {
      cy.visit('/');

    });

    // --- UNHAPPY PATH: NOT SIGNED IN ---
    it('Should NOT allow guests to access Create Page', () => {
      
      // Navigate to Profile Page
      cy.get('a[href="/profile"]').click();

      // Check for Sign In Button
      cy.contains('button', 'Sign In').should('be.visible');

    });

  });


});
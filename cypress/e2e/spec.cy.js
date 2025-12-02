describe('OnlyVibes Event Lifecycle', () => {
  
  // Runs before EVERY test in this file
  beforeEach(() => {
    // Use the command from commands.js
    cy.loginUser('panos@gmail.com', 'panos');
  });

  it('Should create an Event', () => {
    // 1. Click the Create (Plus) button
    // Ensure your Plus button has this class or aria-label. 
    // If not, add aria-label="Create Event" to your button in React.
    cy.get('[aria-label="Create Event"]').click(); 

    // 2. Fill form
    // cy.get('input[name="title"]').type('Cypress Test Party');
    // cy.get('textarea[name="description"]').type('Testing description');
    // cy.get('select[name="category"]').select('Music'); // Assuming you have a select
    // cy.get('input[name="date"]').type('2025-12-30T20:00');

    // 3. Submit
    // cy.contains('button', 'Create Event').click();

    // 4. Handle Success Popup
    // cy.get('.modal-box').should('be.visible');
    // cy.get('.modal-btn').click();

    // 5. Verify it appears on feed
    // cy.contains('Cypress Test Party').should('be.visible');
  });

  // it('Should delete an Event', () => {
  //   // 1. Go to Profile
  //   cy.get('a[href="/profile"]').click();

  //   // 2. Click "Organized Events" tab (Update selector if needed)
  //   cy.contains('Organized Events').click();

  //   // 3. Click on the event we just created
  //   cy.contains('Cypress Test Party').click();

  //   // 4. Click Delete
  //   cy.contains('button', 'Delete').click();

  //   // 5. Confirm Deletion in Popup
  //   cy.get('.modal-box').should('be.visible');
  //   cy.contains('button', 'Yes').click(); // Assuming your popup has a Yes button

  //   // 6. Verify it is gone
  //   cy.contains('Cypress Test Party').should('not.exist');
  // });

});
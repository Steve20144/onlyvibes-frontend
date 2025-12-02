describe('Login Page Tests', () => {

  // Test 1: Unhappy Path (Wrong Credentials)
  it('Should show an error popup for missing/wrong credentials', () => {
    cy.visit('/');

    // Navigate to Login
    cy.get('a[href="/profile"]').click();
    cy.get('.guest-sign-in-button').click();
    
    // Click Sign In without typing anything
    cy.get('.login-btn').click();

    // Assert the custom error message
    cy.get('.modal-box').should('be.visible');
    cy.contains('.modal-text', 'Please enter email and password.'); // Update text if your app says something else
    
    // Close modal
    cy.get('.modal-btn').click();
  });

  // Test 2: Happy Path (Successful Login)
  it('Should allow a user to sign in successfully', () => {
    // We can manually write the steps here to test them, 
    // OR just use the command we made to verify it works.
    cy.loginUser('panos@gmail.com', 'panos');

    // Assert redirection to Home or Profile presence
    cy.location('pathname').should('eq', '/');
    
    // Check for an element that only appears when logged in (like Search)
    cy.get('input[placeholder="Search..."]').should('exist');
  });

});
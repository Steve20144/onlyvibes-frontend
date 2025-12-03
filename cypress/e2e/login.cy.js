describe('Login Page Tests', () => {

  // --- UNHAPPY PATH: WRONG CREDENTIALS ---
  it('Should show an error popup for missing/wrong credentials for Sign In', () => {
    
    cy.navigateToLogin();

    // Click Sign In without typing anything
    cy.contains('button', 'Sign in').click();

    // Assert the custom error message
    cy.get('.modal-box').should('be.visible');
    cy.contains('.modal-text', 'Please enter email and password.'); 
    
    // Close modal
    cy.get('.modal-btn').click();
  });

  // --- UNHAPPY PATH: UNSUCCESSFUL SIGNUP
  it('Should show an error popup for missing/wrong credentials for Sign Up', () => {

    cy.navigateToLogin();

    // Click Sign Up
    cy.contains('Create account').click();
    cy.contains('Join').should('be.visible');

    // Click Sign Up without typing anything
    cy.contains('button', 'Sign Up').click();

    // Assert the custom error message
    cy.get('.modal-box').should('be.visible');
    cy.contains('.modal-text', 'Username, Email, and Password are required.');

  })

  // --- HAPPY PATH: SUCCESSFUL SIGNUP
  it('Should successfully sign up user', () => {

    cy.navigateToLogin();

    // Click Sign Up
    cy.contains('Create account').click();
    cy.contains('Join').should('be.visible');

    // Fill Username, Email and Password
    cy.get('input[type="username"]').type('Cypress');
    cy.get('input[type="email"]').type('cypress@gmail.com');
    cy.get('input[type="password"]').type('cy');

    // Click Sign Up without typing anything
    cy.contains('button', 'Sign Up').click();

    // Assert the custom error message
    cy.get('.modal-box').should('be.visible');
    cy.contains('Success').should('exist');

  })

  // --- UNHAPPY PATH: UNSUCCESSFUL SIGNUP DUE TO DUPLICATE EMAIL
  it('Should show an error popup for duplicate email for Sign Up', () => {

    cy.navigateToLogin();

    // Click Sign Up
    cy.contains('Create account').click();
    cy.contains('Join').should('be.visible');

    // Fill Username, Email and Password
    cy.get('input[type="username"]').type('Cypress2');
    cy.get('input[type="email"]').type('cypress@gmail.com');
    cy.get('input[type="password"]').type('cy');

    // Click Sign Up without typing anything
    cy.contains('button', 'Sign Up').click();

    // Assert the custom error message
    cy.get('.modal-box').should('be.visible');
    cy.contains('.modal-text', 'Email already in use');

  })

  // --- HAPPY PATH: SUCCESSFUL LOGIN ---
  it('Should allow a user to sign in successfully', () => {
    
    
    cy.loginUser('cypress@gmail.com', 'cy');

    // Assert redirection to Home or Profile presence
    cy.location('pathname').should('eq', '/');
    
    // Check for an element that only appears when logged in (like Search)
    cy.get('input[placeholder="Search..."]').should('exist');
  });

  // --- HAPPY PATH: SUCCESSFUL ACCOUNT DELETION ---
  it('Should allow a user to delete their account successfully', () => {
    
    cy.loginUser('cypress@gmail.com', 'cy');

    // Navigate to profile screen
    cy.get('a[href="/profile"]').click();
    
    // Click Delete Account button
    cy.contains('button', 'Delete Account').should('exist').click();

    // Assert the custom popup message
    cy.get('.modal-box').should('be.visible');
    cy.contains('Delete Account').should('exist');

    // Click the Yes button
    cy.contains('Yes').click();

    // Assert the custom alert message
    cy.get('.modal-box').should('be.visible');
    cy.contains('Account Deleted Successfully').should('exist');
    cy.contains('button', 'OK').should('exist').click();

    // Assert redirection to Home or Profile presence
    cy.location('pathname').should('eq', '/login');

  });

  

});
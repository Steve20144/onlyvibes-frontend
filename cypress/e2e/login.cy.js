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
    
    // 1. SETUP: Spy on the network request
    // This matches the endpoint structure in your accounts.js: `/accounts/${accountId}`
    cy.intercept('**/accounts/**').as('deleteAccountReq');

    // 2. Login
    cy.loginUser('cypress@gmail.com', 'cy');

    // 3. Navigate to profile
    cy.get('a[href="/profile"]').click();
    
    // 4. Click Delete
    cy.contains('button', 'Delete Account').should('exist').click();

    // 5. Handle Confirmation Popup
    cy.get('.modal-box').should('be.visible');
    cy.contains('Delete Account').should('exist');
    cy.contains('Yes').click();

    // 6. CRITICAL: Wait for your accounts.js API call to finish
    // This prevents the test from finishing before the DB is actually updated
    cy.wait('@deleteAccountReq').then((interception) => {
        // Debug log to see what the server actually returned
        console.log('Delete API Response:', interception.response);
        
        // Ensure the server returned 200 (OK) and not 500 or 400
        expect(interception.response.statusCode).to.eq(200);
    });

    // 7. Verify UI Success Message
    cy.get('.modal-box').should('be.visible');
    cy.contains('Account Deleted Successfully').should('exist');
    cy.contains('button', 'OK').should('exist').click();

    // 8. Assert Redirect
    cy.location('pathname').should('eq', '/login');

    // 9. FINAL VERIFICATION: Check if user is truly gone
    // We try to log in again. If the account is gone, this MUST fail (401/404).
    cy.request({
        method: 'POST',
        url: 'https://onlyvibes-backend.onrender.com/auth/login', 
        body: {
            email: 'cypress@gmail.com',
            password: 'cy'
        },
        failOnStatusCode: false // Allow 400/500 responses without crashing test
    }).then((response) => {
        // We expect failure (401 Unauthorized or 404 Not Found)
        expect(response.status).to.be.oneOf([401, 404]);
    });

  });

  

});
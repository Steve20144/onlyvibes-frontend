describe('Review Flows', () => {

    let sharedEventName; // Χρησιμοποιείται για να αποθηκευτεί το eventName
    
    // 1. AFTER HOOK: Τρέχει μία φορά μετά από ΟΛΑ τα tests. Εγγυάται το cleanup του Shared Event.
    after(() => {
        cy.log('FINAL CLEANUP: Checking for shared event deletion...');
        
        // Χρησιμοποιούμε το eventName που αποθηκεύτηκε στο Test 2
        const eventName = Cypress.env('eventName'); 
        
        if (eventName) {
            cy.log(`Deleting shared event: ${eventName}`);
            cy.loginUser('panos@gmail.com', 'panos');
            cy.deleteEvent(); // Εδώ γίνεται ο καθαρισμός του shared event
        } else {
            cy.log('No shared event found in env to delete.');
        }
        
        // Clear stored env values
        Cypress.env('eventName', null);
        Cypress.env('reviewText', null);
    });
    
    // ----------------------------------------------------------------------
    // 1. ΔΟΚΙΜΗ: Validation Error (Ανεξάρτητη)
    // ----------------------------------------------------------------------

    it('shows validation error when user attempts to create a review without rating stars', () => {
    // Login
    cy.loginUser('panos@gmail.com', 'panos');
    
    // Πλοήγηση στην Home page (Απαραίτητο)
    cy.visit('/'); 

    // Create a NEW fake event for this test's independence
    cy.createFakeEvent();

    // Open the newly created event 
    cy.get('@eventName').then((eventName) => {
      cy.contains(eventName, { timeout: 10000 }).should('be.visible').click();
    });

    // Prepare unique review text
    const reviewText = 'Review without rating ' + Date.now();

    // Intercept the POST request (γιατί η κλήση ΔΕΝ θα πρέπει να σταλεί)
    cy.intercept('POST', '**/events/*/reviews').as('attemptCreateReview');
    
    // Write review text, but DO NOT CLICK the rating stars
    cy.get('textarea', { timeout: 10000 }).should('be.visible').clear().type(reviewText);

    // Click submit 
    cy.contains('button', /submit|post|send|add|create/i, { timeout: 10000 }).then($btn => {
      if ($btn.length) {
        cy.wrap($btn).click();
      } else {
        cy.get('button[type="submit"]').click();
      }
    });
    
    // --- ΕΛΕΓΧΟΣ ΕΠΙΚΥΡΩΣΗΣ (VALIDATION CHECK) ---
    
    // 1. Assert that the validation error message appears inside the modal
    cy.contains('Please add a star rating!', { timeout: 10000 })
        .should('be.visible');

    // 2. Click the OK button to close the modal
    cy.contains('button', 'OK', { timeout: 10000 }).should('be.visible').click();

    // 3. Assert that the review text is still visible
    cy.get('textarea').should('have.value', reviewText);

    // Cleanup: delete the fake event we created in this test
    cy.deleteEvent(); // <--- Διαγράφει το ανεξάρτητο event
    cy.log('Cleanup complete for rating validation test.');
  });


    // ----------------------------------------------------------------------
    // 2. ΔΟΚΙΜΗ: Create Review (Δημιουργεί το Shared Event)
    // ----------------------------------------------------------------------

  it('create a review on a newly created fake event', () => {
    // Login
    cy.loginUser('panos@gmail.com', 'panos');
    
    // Πλοήγηση στην Home page (απαραίτητο)
    cy.visit('/');

    // Ensure we're at home
    cy.location('pathname', { timeout: 10000 }).should('eq', '/');

    // Create a fake event (stores name as @eventName)
    cy.createFakeEvent();

    // Open the newly created event and store eventName in env for other tests
    cy.get('@eventName').then((eventName) => {
      Cypress.env('eventName', eventName);
      cy.contains(eventName, { timeout: 10000 }).should('be.visible').click();
    });

    // Prepare unique review text
    const reviewText = 'This is a test review ' + Date.now();

    // store reviewText in env so delete-test can use it later
    Cypress.env('reviewText', reviewText);

    // Intercept review POST and the subsequent GET that refreshes the list
    cy.intercept('POST', '**/events/*/reviews').as('createReview');
    cy.intercept('GET', '**/events/*/reviews').as('getReviews');

    // Write and submit a review
    cy.get('textarea', { timeout: 10000 }).should('be.visible').clear().type(reviewText);
    cy.get('svg.lucide-star').eq(4).should('be.visible').click();

    // Click submit in a robust way
    cy.contains('button', /submit|post|send|add|create/i, { timeout: 10000 }).then($btn => {
      if ($btn.length) {
        cy.wrap($btn).click();
      } else {
        cy.get('button[type="submit"]').click();
      }
    });

    // Wait for backend response and assert status
    cy.wait('@createReview', { timeout: 15000 }).its('response.statusCode').should('be.oneOf', [200, 201]);

    // Wait for the reviews GET (UI to refresh) if the app makes one
    cy.wait('@getReviews', { timeout: 15000 }).then(
      () => {
        // success path: GET happened
        cy.contains(reviewText, { timeout: 10000 }).should('be.visible');
      },
      () => {
        // failure path: no GET happened within timeout — reload as fallback
        cy.reload();
        cy.contains(reviewText, { timeout: 10000 }).should('be.visible');
      }
    );
  });


    // ----------------------------------------------------------------------
    // 3. ΔΟΚΙΜΗ: Cancel Review Deletion (Χρησιμοποιεί το Shared Event)
    // ----------------------------------------------------------------------

  it('cancel review deletion', () => { 
      // Login
      cy.loginUser('panos@gmail.com', 'panos');

      // Πλοήγηση στην Home page (απαραίτητο)
      cy.visit('/');
      
      // Ensure we're at home
      cy.location('pathname', { timeout: 10000 }).should('eq', '/');

      // Open the event created by the previous test (use env value)
      const eventName = Cypress.env('eventName');
      if (!eventName) {
        throw new Error('eventName not found in Cypress.env — ensure the create test ran and set it.');
      }
      cy.contains(eventName, { timeout: 10000 }).should('be.visible').click();

      // Retrieve the review text created earlier
      const reviewText = Cypress.env('reviewText');
      if (!reviewText) {
        throw new Error('reviewText not found in Cypress.env — ensure the create test ran and set it.');
      }

      // Intercept only the subsequent GET (for list refresh)
      cy.intercept('GET', '**/events/*/reviews').as('getReviews');

      // Ensure the review exists before attempting delete
      cy.contains(reviewText, { timeout: 10000 }).should('be.visible');

      // Handle native confirm and REJECT it (click No/Cancel)
      cy.on('window:confirm', (text) => {
        expect(text).to.contain('Delete your review');
        return false; // ΑΚΥΡΩΣΗ
      });

      // Click delete (X). 
      cy.get('button:has(svg.lucide-x)', { timeout: 10000 }).first().should('be.visible').click();

      // Ensure UI updated and the review IS STILL VISIBLE
      cy.wait('@getReviews', { timeout: 10000 }).then(
        () => {
          cy.contains(reviewText, { timeout: 10000 }).should('be.visible'); // ΕΛΕΓΧΟΥΜΕ ΟΤΙ ΕΙΝΑΙ ΑΚΟΜΑ ΕΚΕΙ
        },
        () => {
          // Fallback path: If GET reviews didn't happen, ensure the review is still there after a reload.
          cy.reload();
          cy.contains(reviewText, { timeout: 10000 }).should('be.visible'); // ΕΛΕΓΧΟΥΜΕ ΟΤΙ ΕΙΝΑΙ ΑΚΟΜΑ ΕΚΕΙ
        }
      );
});

    // ----------------------------------------------------------------------
    // 4. ΔΟΚΙΜΗ: Successful Delete (Χρησιμοποιεί το Shared Event)
    // ----------------------------------------------------------------------

  it('delete a review from the previously created fake event and then delete the event', () => {
    // Login
    cy.loginUser('panos@gmail.com', 'panos');

      // Πλοήγηση στην Home page (απαραίτητο)
      cy.visit('/');
      
    // Ensure we're at home
    cy.location('pathname', { timeout: 10000 }).should('eq', '/');

    // Open the event created by the previous test (use env value)
    const eventName = Cypress.env('eventName');
    if (!eventName) {
      throw new Error('eventName not found in Cypress.env — ensure the create test ran and set it.');
    }
    cy.contains(eventName, { timeout: 10000 }).should('be.visible').click();

    // Retrieve the review text created earlier
    const reviewText = Cypress.env('reviewText');
    if (!reviewText) {
      throw new Error('reviewText not found in Cypress.env — ensure the create test ran and set it.');
    }

    // Intercept delete request (and optional GET)
    cy.intercept('DELETE', '**/events/*/reviews/*').as('deleteReview');
    cy.intercept('GET', '**/events/*/reviews').as('getReviews');

    // Ensure the review exists before attempting delete
    cy.contains(reviewText, { timeout: 10000 }).should('be.visible');

    // Handle native confirm and accept it
    cy.on('window:confirm', (text) => {
      expect(text).to.contain('Delete your review');
      return true; // accept native confirm dialog
    });

    // Click delete (X)
    cy.get('button:has(svg.lucide-x)', { timeout: 10000 }).first().should('be.visible').click();

    // Wait for delete request and assert success
    cy.wait('@deleteReview', { timeout: 10000 }).its('response.statusCode').should('be.oneOf', [200, 204]);

    // Ensure UI updated (try waiting for reviews GET, otherwise use contains not.exist)
    cy.wait('@getReviews', { timeout: 10000 }).then(
      () => {
        cy.contains(reviewText, { timeout: 10000 }).should('not.exist');
      },
      () => {
        cy.reload();
        cy.contains(reviewText, { timeout: 10000 }).should('not.exist');
      }
    );

    // Ensure still on event page before deleting event
    cy.url({ timeout: 10000 }).should('include', '/events/');

    // Cleanup: delete the fake event we created earlier
    cy.deleteEvent(); // <--- Εδώ ΔΕΝ χρειάζεται πλέον, το κάνει το after() hook
    // Το after() hook θα καθαρίσει το eventName.
    
    // Clear stored env values so subsequent tests won't look for deleted resources
    Cypress.env('eventName', null);
    Cypress.env('reviewText', null);
  });
  
});
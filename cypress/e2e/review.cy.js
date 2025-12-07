describe('Review Flows', () => {

  // Shared env cleanup (αν υπάρχει) μετά από όλα τα tests
  after(() => {
    const eventName = Cypress.env('eventName');
    if (eventName) {
      cy.loginUser('panos@gmail.com', 'panos');
      cy.visit('/');
      cy.deleteEvent();
    }
    Cypress.env('eventName', null);
    Cypress.env('reviewText', null);
  });

  // 1. Validation χωρίς rating (ανεξάρτητο)
  it('shows validation error when user attempts to create a review without rating stars', () => {
    cy.loginUser('panos@gmail.com', 'panos');
    cy.visit('/');

    cy.createFakeEvent();

    cy.get('@eventName').then((eventName) => {
      cy.contains(eventName, { timeout: 10000 }).should('be.visible').click();
    });

    const reviewText = 'Review without rating ' + Date.now();
    cy.intercept('POST', '**/events/*/reviews').as('attemptCreateReview');

    cy.get('textarea', { timeout: 10000 }).should('be.visible').clear().type(reviewText);

    cy.contains('button', /submit|post|send|add|create/i, { timeout: 10000 }).click();

    cy.contains('Please add a star rating!', { timeout: 10000 }).should('be.visible');
    cy.contains('button', 'OK', { timeout: 10000 }).click();
    cy.get('textarea').should('have.value', reviewText);

    cy.deleteEvent();
  });

  // 2. Δημιουργία review (δημιουργεί shared event)
  it('create a review on a newly created fake event', () => {
    cy.loginUser('panos@gmail.com', 'panos');
    cy.visit('/');

    cy.createFakeEvent();

    cy.get('@eventName').then((eventName) => {
      Cypress.env('eventName', eventName);
      cy.contains(eventName, { timeout: 10000 }).should('be.visible').click();
    });

    const reviewText = 'This is a test review ' + Date.now();
    Cypress.env('reviewText', reviewText);

    cy.intercept('POST', '**/events/*/reviews').as('createReview');
    cy.intercept('GET', '**/events/*/reviews').as('getReviews');

    cy.get('textarea', { timeout: 10000 }).should('be.visible').clear().type(reviewText);
    cy.get('svg.lucide-star').eq(4).should('be.visible').click();

    cy.contains('button', /submit|post|send|add|create/i, { timeout: 10000 }).click();

    cy.wait('@createReview', { timeout: 15000 }).its('response.statusCode').should('be.oneOf', [200, 201]);

    cy.wait('@getReviews', { timeout: 15000 }).then(
      () => cy.contains(reviewText, { timeout: 10000 }).should('be.visible'),
      () => { cy.reload(); cy.contains(reviewText, { timeout: 10000 }).should('be.visible'); }
    );
  });

  // 3. Ακύρωση διαγραφής
  it('cancel review deletion', () => {
    cy.loginUser('panos@gmail.com', 'panos');
    cy.visit('/');

    const eventName = Cypress.env('eventName');
    const reviewText = Cypress.env('reviewText');
    if (!eventName || !reviewText) throw new Error('Missing shared event/review data');

    cy.contains(eventName, { timeout: 10000 }).should('be.visible').click();

    cy.intercept('GET', '**/events/*/reviews').as('getReviews');
    cy.contains(reviewText, { timeout: 10000 }).should('be.visible');

    cy.on('window:confirm', (text) => {
      expect(text).to.contain('Delete your review');
      return false; // ακύρωση
    });

    cy.get('button:has(svg.lucide-x)', { timeout: 10000 }).first().click();

    cy.wait('@getReviews', { timeout: 10000 }).then(
      () => cy.contains(reviewText, { timeout: 10000 }).should('be.visible'),
      () => { cy.reload(); cy.contains(reviewText, { timeout: 10000 }).should('be.visible'); }
    );
  });

  // 4. Επιτυχής διαγραφή review και event
  it('delete a review from the previously created fake event and then delete the event', () => {
    cy.loginUser('panos@gmail.com', 'panos');
    cy.visit('/');

    const eventName = Cypress.env('eventName');
    const reviewText = Cypress.env('reviewText');
    if (!eventName || !reviewText) throw new Error('Missing shared event/review data');

    cy.contains(eventName, { timeout: 10000 }).should('be.visible').click();

    cy.intercept('DELETE', '**/events/*/reviews/*').as('deleteReview');
    cy.intercept('GET', '**/events/*/reviews').as('getReviews');

    cy.contains(reviewText, { timeout: 10000 }).should('be.visible');

    cy.on('window:confirm', (text) => {
      expect(text).to.contain('Delete your review');
      return true; // αποδοχή
    });

    cy.get('button:has(svg.lucide-x)', { timeout: 10000 }).first().click();

    cy.wait('@deleteReview', { timeout: 10000 }).its('response.statusCode').should('be.oneOf', [200, 204]);

    cy.wait('@getReviews', { timeout: 10000 }).then(
      () => cy.contains(reviewText, { timeout: 10000 }).should('not.exist'),
      () => { cy.reload(); cy.contains(reviewText, { timeout: 10000 }).should('not.exist'); }
    );

    cy.url({ timeout: 10000 }).should('include', '/events/');
    cy.deleteEvent();
    Cypress.env('eventName', null);
    Cypress.env('reviewText', null);
  });

});
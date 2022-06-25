
Cypress.Commands.add('initial', () => {

    cy.request(
      `https://www.facebook.com/x/oauth/status?ancestor_origins=http%3A%2F%2Fautomationpractice.com&client_id=334341610034299&input_token&origin=1&redirect_uri=http%3A%2F%2Fautomationpractice.com%2Findex.php&sdk=joey&wants_cookie_data=false`
    ).then(res => {
      expect(res.status).to.eql(200)
    })


})

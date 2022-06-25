context('Dress highest price', () => {
  beforeEach(() => {
    cy.visit(`/`)
    cy.initial()
  })
  it('should add the highest price in dress price list to cart', () => {
    cy.get('.sf-with-ul').contains(`Dresses`).click({ force: true })
    cy.get(`#list`).click()
    cy.get(`.right-block-content.row`)
      .as(`right_block`)
      .find(`.price.product-price`)
      .then($prices => {
        const prices = Cypress._.map($prices, price =>
          parseFloat(price.innerText.split(' ')[0].replace(/[^0-9.]/g, ''))
        )

        const max_price = Math.max(...prices)

        cy.get(`.right-block-content.row div .price.product-price`)
          .contains(max_price)
          .then(maximum => {
            cy.wrap(maximum)
              .parentsUntil(`div.right-block`)
              .find(`a[title="Add to cart"]`)
              .click()
            cy.get(`#layer_cart`)
              .find(`h2`)
              .should(
                `contain.text`,
                `Product successfully added to your shopping cart`
              )
            cy.get(`#layer_cart_product_price`).should(`contain`, max_price)
            cy.get(`[title="Close window"]`).click()
          })
      })
  })
})

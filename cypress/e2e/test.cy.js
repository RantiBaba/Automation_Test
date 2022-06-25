describe("test", () => {
  it("test", () => {
    cy.visit(`http://automationpractice.com/index.php`, { timeout: 50000 });
    cy.get(`[title="Dresses"]`, { timeout: 60000 })
      .should(`be.visible`)
      .eq(1)
      .contains(`Dresses`)
      .click({ force: true })
      .then((clicked) => {
        cy.get(`#list`).click();
        cy.get(`.right-block-content.row`, { timeout: 60000 })
          .as(`blocks`)
          .find(`.price.product-price`)
          .then(($prices) => {
            const prices = Cypress._.map($prices, (price) =>
              parseFloat(price.innerText.split(" ")[0].replace(/[^0-9.]/g, ""))
            );

            cy.log(JSON.stringify(prices));

            const max_price = Math.max(...prices);

            cy.get(`.right-block-content.row div .price.product-price`, {
              timeout: 60000,
            })
              .contains(max_price)
              .then((maximum) => {
                cy.wrap(maximum)
                  .parentsUntil(`div.right-block`)
                  .find(`a[title="Add to cart"]`)
                  .click();
                cy.get(`#layer_cart`, { timeout: 10000 })
                  .find(`h2`)
                  .should(
                    `contain.text`,
                    `Product successfully added to your shopping cart`
                  );
                cy.get(`#layer_cart_product_price`).should(
                  `contain`,
                  max_price
                );
                cy.get(`[title="Close window"]`, { timeout: 10000 }).click();
              });
          });
      });
  });

  
});

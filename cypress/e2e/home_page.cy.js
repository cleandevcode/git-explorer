describe(`The Home Page`, () => {
  it(`successfully loads`, () => {
    cy.visit(`http://localhost:3000`);
    cy.get(`#input`).type(`cleandevcode`);
    cy.get(`#input`).should(`have.value`, `cleandevcode`);

    cy.get(`#searchBtn`).click();

    cy.get(`#userItem-cleandevcode`).click();

    cy.get(`#container`).scrollTo("bottom", { duration: 2000 });
    cy.get(`#container`).scrollTo("top", { duration: 2000 });

    cy.get(`#repoItem1`).click();
  });
});

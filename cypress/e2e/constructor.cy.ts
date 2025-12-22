describe('Burger Constructor Page', () => {
  const bunId = '643d69a5c3f7b9001cfa093c';
  const mainId = '643d69a5c3f7b9001cfa0941';
  const sauceId = '643d69a5c3f7b9001cfa0942';

  beforeEach(() => {
    cy.viewport(2560, 1440);
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.visit('/');
    cy.wait('@getIngredients');

    cy.get(`[data-cy="ingredient-${bunId}"]`, {
      timeout: 10000
    }).should('exist');
  });

  it('Проверка вывода перечня ингридиентов', () => {
    cy.get(`[data-cy="ingredient-${bunId}"]`).should('be.visible');
    cy.get(`[data-cy="ingredient-${mainId}"]`).should('be.visible');
  });

  it('Проверка открытия модалки с описанием ингридиента', () => {
    cy.get(`[data-cy="ingredient-link-${bunId}"]`).first().click();
    cy.get('[data-cy="modal-close"]').should('exist');
    cy.get('[data-cy="modal-close"]').click();
    cy.get('[data-cy="modal-close"]').should('not.exist');
    cy.get(`[data-cy="ingredient-link-${bunId}"]`).first().click();
    cy.get('[data-cy="modal-overlay"]').should('exist');
    cy.get('[data-cy="modal-overlay"]').click({ force: true });
    cy.get('[data-cy="modal-close"]').should('not.exist');
  });

  it('Проверка добавления булок, начинки и соуса в конструктор', () => {
    cy.get(`[data-cy="add-ingredient-${bunId}"]`).find('button').click();
    cy.get('[data-cy="constructor-bun-top"]').should('contain', 'Краторная');
    cy.get(`[data-cy="add-ingredient-${mainId}"]`).find('button').click();
    cy.get('[data-cy^="constructor-ingredient"]').should('have.length.gte', 1);
    cy.get(`[data-cy="add-ingredient-${sauceId}"]`).find('button').click();
    cy.get('[data-cy^="constructor-ingredient"]').should('have.length.gte', 2);
  });

  it('Проверка создания заказа', () => {
    cy.intercept('POST', '/api/orders', { fixture: 'order.json' }).as(
      'createOrder'
    );
    cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' }).as(
      'getUser'
    );
    cy.setCookie('accessToken', 'fake-token');
    cy.visit('/');
    cy.wait('@getUser');
    cy.wait('@getIngredients');
    cy.get(`[data-cy="add-ingredient-${bunId}"]`).find('button').click();
    cy.get(`[data-cy="add-ingredient-${mainId}"]`).find('button').click();
    cy.get('[data-cy="order-button"]').should('not.be.disabled');
    cy.get('[data-cy="order-button"]').click();
    cy.wait('@createOrder');
    cy.get('[data-cy="order-number"]').should('contain', '12345');
    cy.get('[data-cy="modal-close"]').click();
    cy.get('[data-cy="order-number"]').should('not.exist');
    cy.get('[data-cy="constructor-bun-top"]').should('not.exist');
    cy.get('[data-cy^="constructor-ingredient"]').should('not.exist');
  });
});

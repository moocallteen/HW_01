export class BasePO {
  getByDataAttribute(selector, options = {}) {
    return cy.get(`[data-cy=${selector}]`, options);
  }
}
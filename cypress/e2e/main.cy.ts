describe('Main Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('displays posts and allows navigation', () => {
    // Check if posts are loaded
    cy.get('[data-testid="post-card"]').should('have.length.gt', 0);
    
    // Click on a post and verify navigation
    cy.get('[data-testid="post-card"]').first().click();
    cy.url().should('include', '/article/');
    
    // Verify article content is displayed
    cy.get('h1').should('be.visible');
  });

  it('allows category filtering', () => {
    // Select a category
    cy.get('[data-testid="category-filter"]').click();
    cy.get('[data-testid="category-option"]').contains('리포트').click();
    
    // Verify filtered results
    cy.get('[data-testid="post-card"]')
      .should('have.length.gt', 0)
      .each($card => {
        cy.wrap($card).contains('리포트');
      });
  });
}); 
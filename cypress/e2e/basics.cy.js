
describe('Fundamental Tests', () => {

beforeEach (() =>  {
    cy.visit('/');
    })


it("contains correct header text", () => {
    cy.get('h1').contains("Smarter Medical System Management")
})
   
  });


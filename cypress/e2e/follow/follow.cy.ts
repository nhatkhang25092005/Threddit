/// <reference types="cypress" />
const timeout = 30000;
describe("follow", () => {
  beforeEach(() => {
    cy.session("user-session", () => {
      cy.visit("http://localhost:5000/auth");
      cy.get('[data-testid="email-input"]')
        .type("nhatkhang25092005@gmail.com")
        .should("have.value", "nhatkhang25092005@gmail.com");
      cy.get('[data-testid="password-input"]')
        .type("@Minedash13579")
        .should("have.value", "@Minedash13579");
      cy.get('[data-testid="login-submit-btn"]').click();
      cy.url().should("include", "/app/home");
    });
  });

  it("Should follow a user successfully", () => {
    cy.visit("http://localhost:5000/app/profile");
    cy.intercept("GET", "**/api/profile/chicken").as("getProfile");
    cy.intercept("POST", "**/api/follow/**").as("postFollow");
    cy.wait(2000);
    cy.get("[role = 'tab']").eq(1).click();
    cy.get('[data-testid = "follow-list"]')
      .should("be.visible")
      .within(() => {
        cy.get("[role = 'tab']").eq(1).click();
        cy.document().then((doc) => {
          const hasItem =
            doc.querySelectorAll('[data-testid ^= "following-item-"]').length >
            0;
          if (hasItem) {
            cy.get('[data-testid ^= "following-item-"]').then(($item) => {
              const initialCount = $item.length;
              cy.wrap(initialCount).as("initialCount");
            });
          } else {
            cy.wrap(0).as("initialCount");
          }
        });

        cy.wait(2000);
      });
    cy.visit("http://localhost:5000/app/profile/chicken");

    cy.wait("@getProfile", { timeout: timeout })
      .its("response.statusCode")
      .should("eq", 200);
    cy.wait(3000);
    cy.get('[data-testid="toggle-follow-button"]').click();
    cy.wait("@postFollow", { timeout: timeout })
      .its("response.statusCode")
      .should("eq", 200);
    cy.get('[data-testid="snackbar"]').should("be.visible");
    cy.get('[data-testid="snackbar"]', { timeout: 5000 }).should("not.exist");
    cy.wait(3000);

    cy.visit("http://localhost:5000/app/profile");
    cy.wait(2000);
    cy.get("[role = 'tab']").eq(1).click();
    cy.get('[data-testid = "follow-list"]')
      .should("be.visible")
      .within(() => {
        cy.get("[role = 'tab']").eq(1).click();
        cy.get("@initialCount").then((initialCount) => {
          cy.get('[data-testid ^= "following-item-"]').should(
            "have.length",
            initialCount + 1,
          );
        });
      });
  });

  it("Should unfollow a user successfully", () => {
    cy.visit("http://localhost:5000/app/profile");
    cy.wait(3000);
    cy.get('[role="tab"]').eq(1).click();
    cy.get('[data-testid="follow-list"]')
      .should("be.visible")
      .within(() => {
        cy.get("[role='tab']").eq(1).click();
        cy.document().then((doc) => {
          const hasItem =
            doc.querySelectorAll('[data-testid ^= "following-item-"]').length >
            0;
          if (hasItem) {
            cy.get('[data-testid ^= "following-item-"]').then(($item) => {
              const initialCount = $item.length;
              cy.wrap(initialCount).as("initialCount");
            });
          } else {
            cy.wrap(0).as("initialCount");
          }
        });
      });
    cy.wait(2000);
    cy.visit("http://localhost:5000/app/profile/chicken");
    cy.intercept("GET", "**/api/profile/chicken").as("getProfile");
    cy.intercept("DELETE", "**/api/follow/**").as("deleteFollow");
    cy.wait("@getProfile", { timeout: timeout })
      .its("response.statusCode")
      .should("eq", 200);
    cy.get('[data-testid="toggle-follow-button"]').click();
    cy.wait("@deleteFollow", { timeout: timeout })
      .its("response.statusCode")
      .should("eq", 200);
    cy.get('[data-testid="snackbar"]').should("be.visible");
    cy.get('[data-testid="snackbar"]', { timeout: 5000 }).should("not.exist");
    cy.wait(1000);
    cy.visit("http://localhost:5000/app/profile");
    cy.get("[role = 'tab']").eq(1).click();
    cy.get('[data-testid = "follow-list"]')
      .should("be.visible")
      .within(() => {
        cy.get("[role = 'tab']").eq(1).click();
        cy.get("@initialCount").then((initialCount) => {
          cy.get('[data-testid ^= "following-item-"]').should(
            "have.length",
            initialCount - 1,
          );
        });
      });
  });
});

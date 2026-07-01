/// <reference types="cypress" />
/// <reference types="cypress-real-events" />

describe("reaction", () => {
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
  it("Should scroll to the post and trigger reaction bar successfully", () => {
    cy.intercept("POST", "**/api/content/**/reaction").as("createReaction");
    cy.visit("http://localhost:5000/app/profile");

    // find the first reaction button and check if it has no emote icon
    cy.get("[data-testid^=reaction-button-]", { timeout: 15000 })
      .first()
      .as("firstReactionBtn")
      .find('[data-testid^="no-emote-icon-"]')
      .should("exist");

    // hover over the first reaction button to trigger the reaction bar
    cy.get("@firstReactionBtn").realHover({ scrollBehavior: "center" });
    cy.wait(2000);

    // check if the reaction bar is visible then click the first reaction button in the reaction bar
    cy.get('[data-testid="reaction-bar"]')
      .find("button")
      .first()
      .click({ scrollBehavior: false });

    // wait for the create reaction request to complete and check if the response status code is 200
    cy.wait("@createReaction", { timeout: 15000 })
      .its("response.statusCode")
      .should("eq", 200);

    // check if the first reaction button now has the selected reaction emoji and label
    cy.get("@firstReactionBtn")
      .find('[data-testid^="selected-reaction-emoji-"]')
      .should("be.visible");
    cy.get("@firstReactionBtn")
      .find('[data-testid^="selected-reaction-label-"]')
      .should("be.visible");

    // wait for 2 seconds before ending the test to ensure that the reaction bar is closed and the selected reaction is displayed correctly
    cy.wait(2000);
  });
  it("Should delete a reaction successfully", () => {
    cy.intercept("DELETE", "**/api/content/**/reaction").as("deleteReaction");
    cy.visit("http://localhost:5000/app/profile");

    // find the first reaction button and check if it has no emote icon
    cy.get("[data-testid^=reaction-button-]", { timeout: 15000 })
      .first()
      .as("firstReactionBtn")
      .find('[data-testid^="selected-reaction-emoji-"]')
      .should("exist");
    cy.wait(2000);

    // click the first reaction button to delete the reaction
    cy.get("@firstReactionBtn").click({ scrollBehavior: "center" });

    // wait for the delete reaction request to complete and check if the response status code is 200
    cy.wait("@deleteReaction", { timeout: 15000 })
      .its("response.statusCode")
      .should("eq", 200);

    // check if the first reaction button now has the selected reaction emoji and label
    cy.get("@firstReactionBtn")
      .find('[data-testid^="no-emote-icon-"]')
      .should("be.visible");

    // wait for 2 seconds before ending the test to ensure that the reaction bar is closed and the selected reaction is displayed correctly
    cy.wait(2000);
  });
  it("Should update a reaction successfully", () => {
    cy.intercept("POST", "**/api/content/**/reaction").as("createReaction");
    cy.intercept("PATCH", "**/api/content/**/reaction").as("updateReaction");
    cy.intercept("DELETE", "**/api/content/**/reaction").as("deleteReaction");
    cy.visit("http://localhost:5000/app/profile");

    cy.get("[data-testid^=reaction-button-]", { timeout: 15000 })
      .first()
      .as("firstReactionBtn");
    const createReaction = () => {
      // find the first reaction button and check if it has no emote icon
      cy.get("@firstReactionBtn")
        .find('[data-testid^="no-emote-icon-"]')
        .should("exist");

      // hover over the first reaction button to trigger the reaction bar
      cy.get("@firstReactionBtn").realHover({ scrollBehavior: "center" });
      cy.wait(2000);

      // check if the reaction bar is visible then click the first reaction button in the reaction bar
      cy.get('[data-testid="reaction-bar"]')
        .find("button")
        .first()
        .click({ scrollBehavior: false });

      // wait for the create reaction request to complete and check if the response status code is 200
      cy.wait("@createReaction", { timeout: 15000 })
        .its("response.statusCode")
        .should("eq", 200);

      // check if the first reaction button now has the selected reaction emoji and label
      cy.get("@firstReactionBtn")
        .find('[data-testid^="selected-reaction-emoji-"]')
        .should("be.visible");
      cy.get("@firstReactionBtn")
        .find('[data-testid^="selected-reaction-label-"]')
        .should("be.visible");
      cy.get("body").realHover({ position: "topLeft" });
      // wait for 2 seconds before ending the test to ensure that the reaction bar is closed and the selected reaction is displayed correctly
      cy.wait(2000);
    };

    cy.get("[data-testid^=reaction-button-]", { timeout: 15000 })
      .first()
      .as("newReactionBtn");
    const updateReaction = () => {
      // hover over the first reaction button to trigger the reaction bar
      cy.get("@newReactionBtn").realHover({ scrollBehavior: "center" });
      // cy.get("@newReactionBtn").trigger("mouseenter", {
      //   scrollBehavior: "center",
      // });
      // cy.screenshot("debug-hover-state");
      cy.get('[data-testid="reaction-bar"]', { timeout: 10000 }).should(
        "be.visible",
      );

      // check if the reaction bar is visible then click the first reaction button in the reaction bar
      cy.get('[data-testid="reaction-bar"]')
        .find("[data-testid^=reaction-button-HAHA]")
        .click({ scrollBehavior: false });

      // wait for the update reaction request to complete and check if the response status code is 200
      cy.wait("@updateReaction", { timeout: 15000 })
        .its("response.statusCode")
        .should("eq", 200);

      // check if the first reaction button now has the selected reaction emoji and label
      cy.get("@newReactionBtn")
        .find('[data-testid^="selected-reaction-emoji-"]')
        .should("be.visible");
      cy.get("@newReactionBtn")
        .find('[data-testid^="selected-reaction-label-"]')
        .should("be.visible");

      // wait for 2 seconds before ending the test to ensure that the reaction bar is closed and the selected reaction is displayed correctly
      cy.wait(2000);
    };

    const resetReactionForNextTest = () => {
      cy.get("[data-testid^=reaction-button-]", { timeout: 15000 })
        .first()
        .as("firstReactionBtn")
        .find('[data-testid^="selected-reaction-emoji-"]')
        .should("exist");

      cy.get("@firstReactionBtn").click({ scrollBehavior: "center" });

      cy.wait("@deleteReaction", { timeout: 15000 })
        .its("response.statusCode")
        .should("eq", 200);

      cy.get("@firstReactionBtn")
        .find('[data-testid^="no-emote-icon-"]')
        .should("be.visible");
    };
    createReaction();
    updateReaction();
    resetReactionForNextTest();
  });
});

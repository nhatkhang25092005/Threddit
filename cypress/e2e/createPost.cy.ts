/// <reference types="cypress" />
import { EMOJI } from "../../src/constant/emoji";

describe("post creation", () => {
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

  // create post with text only
  it("should create post with text only successfully", () => {
    cy.intercept("POST", "**/api/content").as("createPostRequest");
    // navigate to the page
    cy.visit("http://localhost:5000/app/profile");

    // declare test value
    const now = Date.now();
    const postTextContent = `text content of post creation at ${now}`;

    // open the modal
    cy.get('[data-testid="create-post-input-button"]').click();
    cy.get('[data-testid="create-post-modal"]').should("be.visible");
    cy.get('[data-testid="create-post-button"]').should("be.disabled");

    // type the test value into modal
    cy.get('[data-testid="post-editor-textarea"]')
      .type(postTextContent)
      .should("have.value", postTextContent);

    // Click the create new post button
    cy.get('[data-testid="create-post-button"]').should("be.enabled").click();
    cy.get('[data-testid="create-post-button"]').should("be.disabled");
    cy.get('[data-testid="create-post-loading"]').should("be.visible");
    cy.wait("@createPostRequest", { timeout: 30000 })
      .its("response.statusCode")
      .should("eq", 201);
    cy.get('[data-testid="create-post-modal"]').should("not.exist");

    // toast notification and result display
    cy.get('[data-testid="snackbar"]').should("be.visible");
    cy.get('[data-testid="snackbar"]', { timeout: 5000 }).should("not.exist");
    cy.contains(postTextContent).should("be.visible");
  });

  // create post with media only
  it("should create post with media only successfully", () => {
    cy.intercept("POST", "**/api/content").as("createPostRequest");
    cy.visit("http://localhost:5000/app/profile");

    // open the modal
    cy.get('[data-testid="create-post-input-button"]').click();
    cy.get('[data-testid="create-post-modal"]').should("be.visible");
    cy.get('[data-testid="create-post-button"]').should("be.disabled");
    cy.get('[data-testid="post-editor-textarea"]').should("have.value", "");
    cy.get('[data-testid="create-post-button"]').should("be.disabled");
    // click the upload media button
    cy.get('[data-testid = "image-upload-input-to-post"]').selectFile(
      "cypress/fixtures/sample_image.jpg",
      { force: true },
    );

    // upload result expected
    cy.get('[data-testid="preview-image-0"]').should("be.visible");
    cy.get('[data-testid="create-post-button"]').should("be.enabled").click();

    // 6. Assert the successful submission lifecycle
    cy.get('[data-testid="create-post-loading"]').should("be.visible");
    cy.wait("@createPostRequest", { timeout: 30000 })
      .its("response.statusCode")
      .should("eq", 201);
    cy.get('[data-testid="create-post-modal"]').should("not.exist");
    cy.get('[data-testid="snackbar"]').should("be.visible");
    cy.get('[data-testid="snackbar"]', { timeout: 5000 }).should("not.exist");
  });

  it("should create post with content mixing successfully", () => {
    cy.intercept("POST", "**/api/content").as("createPostRequest");
    cy.visit("http://localhost:5000/app/profile");
    // open the modal
    cy.get('[data-testid="create-post-input-button"]').click();
    cy.get('[data-testid="create-post-modal"]').should("be.visible");
    cy.get('[data-testid="create-post-button"]').should("be.disabled");
    cy.get('[data-testid="post-editor-textarea"]').should("have.value", "");
    cy.get('[data-testid="create-post-button"]').should("be.disabled");

    // Contents
    const now = Date.now();
    const postTextContent = `mixing content of post creation at ${now}`;

    cy.get('[data-testid="post-editor-textarea"]')
      .type(postTextContent)
      .should("have.value", postTextContent);
    cy.get('[data-testid = "image-upload-input-to-post"]').selectFile(
      "cypress/fixtures/sample_image.jpg",
      { force: true },
    );
    cy.get('[data-testid = "sound-upload-input-to-post"]').selectFile(
      "cypress/fixtures/sample_sound.mp3",
      { force: true },
    );
    cy.get('[data-testid = "video-upload-input-to-post"]').selectFile(
      "cypress/fixtures/sample_video.mp4",
      { force: true },
    );

    cy.get('[data-testid="create-post-body"]').scrollTo("bottom", {
      duration: 500,
    });
    cy.get('[data-testid="create-post-button"]').should("be.enabled").click();

    // 6. Assert the successful submission lifecycle
    cy.get('[data-testid="create-post-loading"]').should("be.visible");
    cy.wait("@createPostRequest", { timeout: 30000 })
      .its("response.statusCode")
      .should("eq", 201);
    cy.get('[data-testid="create-post-modal"]').should("not.exist");
    cy.get('[data-testid="snackbar"]').should("be.visible");
    cy.get('[data-testid="snackbar"]', { timeout: 5000 }).should("not.exist");
  });

  // blank input protection
  it("Should disable the button if there are no content provided", () => {
    cy.visit("http://localhost:5000/app/profile");
    cy.get('[data-testid="create-post-input-button"]').click();
    cy.get('[data-testid="create-post-button"]').should("be.disabled");
    cy.wait(1500);
  });

  // Alert protect editing content
  it("Should appear the notification if click close the modal", () => {
    cy.visit("http://localhost:5000/app/profile");
    cy.get('[data-testid="create-post-input-button"]').click();
    cy.get('[data-testid="close-modal-button"]').click();
    cy.get('[data-testid="close-modal-alert"]').should("be.visible");
    cy.wait(1500);
  });

  // Safety close modal
  it("Should close the modal if clicking on the close modal button", () => {
    cy.visit("http://localhost:5000/app/profile");
    cy.get('[data-testid="create-post-input-button"]').click();
    cy.wait(800);
    cy.get('[data-testid="close-modal-button"]').click();
    cy.wait(800);
    cy.get('[data-testid="close-confirm-button"]').click();
  });

  // Error occurs notify using a popup
  it("Should appear popup to notify the error", () => {
    cy.intercept("POST", "**/api/content").as("createPostRequest");
    cy.visit("http://localhost:5000/app/profile");

    // open the modal
    cy.get('[data-testid="create-post-input-button"]').click();
    cy.get('[data-testid="create-post-modal"]').should("be.visible");
    cy.get('[data-testid="create-post-button"]').should("be.disabled");
    const toxicContent = `fuck`;
    cy.get('[data-testid="post-editor-textarea"]')
      .type(toxicContent)
      .should("have.value", toxicContent);
    cy.get('[data-testid="create-post-button"]').should("be.enabled").click();
    cy.get('[data-testid="create-post-loading"]').should("be.visible");
    cy.wait("@createPostRequest", { timeout: 30000 })
      .its("response.statusCode")
      .should("eq", 400);
    cy.get('[data-testid="popup"]').should("be.visible");
  });

  // Emoji input
  it("Should type emoji correctly", () => {
    // get API and visit target page
    cy.intercept("POST", "**/api/content").as("createPostRequest");
    cy.visit("http://localhost:5000/app/profile");

    // Open modal
    cy.get('[data-testid="create-post-input-button"]').click();
    cy.get('[data-testid="create-post-modal"]').should("be.visible");
    cy.get('[data-testid="emoji-popup-button"]').click();

    // Random Emoji
    const getRandomEmoji = () => {
      const categories = Object.keys(EMOJI) as Array<keyof typeof EMOJI>;
      const randomCategories =
        categories[Math.floor(Math.random() * categories.length)];
      const emojiList = EMOJI[randomCategories];
      const randomEntry =
        emojiList[Math.floor(Math.random() * emojiList.length)];
      return randomEntry.char;
    };

    // Enter the emojis one by one
    for (let i = 0; i < 5; i++) {
      const randomEmoji = getRandomEmoji();
      cy.get(`[data-testid=${randomEmoji}]`).click();
      cy.wait(500);
    }
    cy.get('[data-testid="popover-emoji"').click();

    // Create post
    cy.get('[data-testid="create-post-button"]').should("be.enabled").click();
    cy.get('[data-testid="create-post-loading"]').should("be.visible");
    cy.wait("@createPostRequest", { timeout: 30000 })
      .its("response.statusCode")
      .should("eq", 201);
  });
});

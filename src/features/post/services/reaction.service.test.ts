import { describe, expect, it, vi, beforeEach } from "vitest";
import { reactionService } from "./reaction.service";
import { reactionApi } from "@/api/content/reaction/reaction.api";
import { createMockApiResponse } from "@/test/createMockApiResponse";
vi.mock("@/api/content/reaction/reaction.api", () => ({
  reactionApi: {
    react: vi.fn(),
    unreact: vi.fn(),
    updateReaction: vi.fn(),
  },
}));

describe("reactionService.calculateNextReaction", () => {
  beforeEach(() => vi.clearAllMocks());
  it("Should return NEW_REACTION if previous reaction is null", () => {
    const result = reactionService.calculateNextReaction(null, "HAHA");
    expect(result).toEqual("NEW_REACTION");
  });
  it("Should return UN_REACTION if previous and next reaction is same", () => {
    const result = reactionService.calculateNextReaction("HAHA", "HAHA");
    expect(result).toEqual("UN_REACTION");
  });
  it("Should return UPDATE_REACTION if previous and next reaction is different", () => {
    const result = reactionService.calculateNextReaction("HAHA", "SAD");
    expect(result).toEqual("UPDATE_REACTION");
  });
  it("Should return EMPTY_NEXT_REACTION_UNEXPECT if next reaction is null", () => {
    const result = reactionService.calculateNextReaction("HAHA", null);
    expect(result).toEqual("EMPTY_NEXT_REACTION_UNEXPECT");
  });
});

describe("reactionService.reaction", () => {
  const postId = 1;
  beforeEach(() => vi.clearAllMocks());
  it("should setReaction successfully if input is valid", async () => {
    vi.mocked(reactionApi.react).mockResolvedValue(
      createMockApiResponse(201, undefined, "react successfully", 201),
    );

    const result = await reactionService.react(postId, { type: "HAHA" });
    expect(reactionApi.react).toHaveBeenCalledWith(postId, { type: "HAHA" });
    expect(result).toEqual({
      success: true,
      message: "react successfully",
    });
  });

  it("Should unReaction successfully if input is valid", async () => {
    vi.mocked(reactionApi.unreact).mockResolvedValue(
      createMockApiResponse(200, undefined, "unreact successfully", 200),
    );
    const result = await reactionService.unreact(postId);
    expect(reactionApi.unreact).toHaveBeenCalledWith(postId);
    expect(result).toEqual({
      success: true,
      message: "unreact successfully",
    });
  });

  it("Should return valid failure shape if react api is fail", async () => {
    vi.mocked(reactionApi.react).mockResolvedValue(
      createMockApiResponse(400, undefined, "create reaction failed", 400),
    );

    const result = await reactionService.react(postId, { type: "HAHA" });
    expect(reactionApi.react).toHaveBeenCalledWith(postId, { type: "HAHA" });
    expect(result).toEqual({
      success: false,
      message: "create reaction failed",
    });
  });
  it("Should return valid failure shape if unreact api is fail", async () => {
    vi.mocked(reactionApi.unreact).mockResolvedValue(
      createMockApiResponse(400, undefined, "unreact failed", 400),
    );
    const result = await reactionService.unreact(postId);
    expect(reactionApi.unreact).toHaveBeenCalledWith(postId);
    expect(result).toEqual({
      success: false,
      message: "unreact failed",
    });
  });
});

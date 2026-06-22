import { describe, expect, it, vi, beforeEach } from "vitest";
import { followApi } from "../../api/follow/follow.api";
import { createMockApiResponse } from "@/test/createMockApiResponse";
import { services } from "./services";
vi.mock("../../api/follow/follow.api", () => ({
  followApi: {
    follow: vi.fn(),
    unfollow: vi.fn(),
  },
}));

const username = "abc";

describe("followService.followUser", () => {
  beforeEach(() => vi.clearAllMocks());
  it("Should return success shape value if follow user successfully", async () => {
    vi.mocked(followApi.follow).mockResolvedValue(
      createMockApiResponse(201, undefined, "Follow success", 201),
    );

    const result = await services.followUser(username);

    expect(followApi.follow).toHaveBeenCalledWith(username);
    expect(result).toEqual({
      success: true,
      message: "Follow success",
    });
  });

  it("Should return failure shape value if follow user unsuccessfully", async () => {
    vi.mocked(followApi.follow).mockResolvedValue(
      createMockApiResponse(400, undefined, "No user found", 400),
    );

    const result = await services.followUser(username);

    expect(followApi.follow).toHaveBeenCalledWith(username);
    expect(result).toEqual({
      success: false,
      message: "No user found",
    });
  });
});

describe("followService.unfollowUser", () => {
  beforeEach(() => vi.clearAllMocks());
  it("Should return success shape value if unfollow user successfully", async () => {
    vi.mocked(followApi.unfollow).mockResolvedValue(
      createMockApiResponse(200, undefined, "unfollow successfully", 200),
    );

    const result = await services.unfollowUser(username);
    expect(followApi.unfollow).toHaveBeenCalledWith(username);
    expect(result).toEqual({
      success: true,
      message: "unfollow successfully",
    });
  });

  it("Should return failure shape value if unfollow user unsuccessfully", async () => {
    vi.mocked(followApi.unfollow).mockResolvedValue(
      createMockApiResponse(400, undefined, "No user found", 400),
    );

    const result = await services.unfollowUser(username);
    expect(followApi.unfollow).toHaveBeenCalledWith(username);
    expect(result).toEqual({
      success: false,
      message: "No user found",
    });
  });
});

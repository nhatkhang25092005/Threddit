import { describe, expect, it, vi, beforeEach } from "vitest";
import { friendApi } from "../../../api/friend/friend.api";
import { createMockApiResponse } from "@/test/createMockApiResponse";
import { apiService } from "./api.service";
vi.mock("../../../api/friend/friend.api", () => ({
  friendApi: {
    request: vi.fn(),
    acceptRequest: vi.fn(),
    rejectRequest: vi.fn(),
  },
}));

const username = "abc";

describe("friendService.sendFriendRequest", () => {
  beforeEach(() => vi.clearAllMocks());
  it("Should return success shape if request friend sent successfully", async () => {
    vi.mocked(friendApi.request).mockResolvedValue(
      createMockApiResponse(200, undefined, "Sent request successfully", 200),
    );

    const result = await apiService.requestFriend(username);

    expect(friendApi.request).toHaveBeenCalledWith(username);
    expect(result).toEqual({
      success: true,
      message: "Sent request successfully",
    });
  });

  it("Should return failure shape if request friend sent unsuccessfully", async () => {
    vi.mocked(friendApi.request).mockResolvedValue(
      createMockApiResponse(400, undefined, "Sent request unsuccessfully", 400),
    );

    const result = await apiService.requestFriend(username);

    expect(friendApi.request).toHaveBeenCalledWith(username);
    expect(result).toEqual({
      success: false,
      message: "Sent request unsuccessfully",
    });
  });
});

describe("friendService.acceptFriendRequest", () => {
  beforeEach(() => vi.clearAllMocks());
  it("Should return success shape if accept request friend successfully", async () => {
    vi.mocked(friendApi.acceptRequest).mockResolvedValue(
      createMockApiResponse(200, undefined, "Accept request successfully", 200),
    );

    const result = await apiService.acceptRequest(username);
    expect(friendApi.acceptRequest).toHaveBeenCalledWith(username);
    expect(result).toEqual({
      success: true,
      message: "Accept request successfully",
    });
  });

  it("Should return failure shape if accept request friend unsuccessfully", async () => {
    vi.mocked(friendApi.acceptRequest).mockResolvedValue(
      createMockApiResponse(
        400,
        undefined,
        "Accept request unsuccessfully",
        400,
      ),
    );

    const result = await apiService.acceptRequest(username);
    expect(friendApi.acceptRequest).toHaveBeenCalledWith(username);
    expect(result).toEqual({
      success: false,
      message: "Accept request unsuccessfully",
    });
  });
});

describe("friendService.rejectFriendRequest", () => {
  beforeEach(() => vi.clearAllMocks());
  it("Should return success shape if reject friend request successfully", async () => {
    vi.mocked(friendApi.rejectRequest).mockResolvedValue(
      createMockApiResponse(200, undefined, "Reject request successfully", 200),
    );

    const result = await apiService.rejectRequest(username);
    expect(friendApi.rejectRequest).toHaveBeenCalledWith(username);
    expect(result).toEqual({
      success: true,
      message: "Reject request successfully",
    });
  });
  it("Should return failure shape if reject friend request unsuccessfully", async () => {
    vi.mocked(friendApi.rejectRequest).mockResolvedValue(
      createMockApiResponse(
        400,
        undefined,
        "Reject request unsuccessfully",
        400,
      ),
    );

    const result = await apiService.rejectRequest(username);
    expect(friendApi.rejectRequest).toHaveBeenCalledWith(username);
    expect(result).toEqual({
      success: false,
      message: "Reject request unsuccessfully",
    });
  });
});

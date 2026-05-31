import { describe, expect, it, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useCommentComposer } from "./useCommentComposer";

const baseComment = {
  id: 1,
  text: "original",
  author: { username: "alice" },
};

describe("useCommentComposer", () => {
  it("initializes with editing and replying disabled", () => {
    const { result } = renderHook(() =>
      useCommentComposer({ comment: baseComment })
    );

    expect(result.current.isEditing).toBe(false);
    expect(result.current.isReplying).toBe(false);
  });

  it("opens and closes edit mode", () => {
    const { result } = renderHook(() =>
      useCommentComposer({ comment: baseComment })
    );

    act(() => result.current.openEdit());
    expect(result.current.isEditing).toBe(true);

    act(() => result.current.closeEdit());
    expect(result.current.isEditing).toBe(false);
  });

  it("toggles reply mode", () => {
    const { result } = renderHook(() =>
      useCommentComposer({ comment: baseComment })
    );

    act(() => result.current.toggleReplying());
    expect(result.current.isReplying).toBe(true);

    act(() => result.current.closeReplying());
    expect(result.current.isReplying).toBe(false);
  });

  it("submits edit successfully and closes edit mode", async () => {
    const onEdit = vi.fn().mockResolvedValue({ success: true });
    const { result } = renderHook(() =>
      useCommentComposer({ comment: baseComment, onEdit })
    );

    act(() => result.current.openEdit());

    let response;
    await act(async () => {
      response = await result.current.submitEdit({ text: "updated", media: [] });
    });

    expect(onEdit).toHaveBeenCalledWith(1, {
      currentComment: baseComment,
      media: [],
      text: "updated",
    });
    expect(response).toEqual({ success: true });
    expect(result.current.isEditing).toBe(false);
  });

  it("returns failure when onEdit is missing", async () => {
    const { result } = renderHook(() =>
      useCommentComposer({ comment: baseComment })
    );

    let response;
    await act(async () => {
      response = await result.current.submitEdit({ text: "updated", media: [] });
    });

    expect(response).toEqual({ success: false });
  });

  it("keeps edit mode open when edit fails", async () => {
    const onEdit = vi.fn().mockResolvedValue({ success: false });
    const { result } = renderHook(() =>
      useCommentComposer({ comment: baseComment, onEdit })
    );

    act(() => result.current.openEdit());

    await act(async () => {
      await result.current.submitEdit({ text: "updated", media: [] });
    });

    expect(result.current.isEditing).toBe(true);
  });

  it("submits reply successfully and closes reply mode", async () => {
    const onReply = vi.fn().mockResolvedValue({ success: true });
    const { result } = renderHook(() =>
      useCommentComposer({ comment: baseComment, onReply })
    );

    act(() => result.current.toggleReplying());

    await act(async () => {
      await result.current.submitReply({
        text: "reply text",
        media: [],
      });
    });

    expect(onReply).toHaveBeenCalledWith({
      media: [],
      parentComment: baseComment,
      text: "reply text",
    });
    expect(result.current.isReplying).toBe(false);
  });
});

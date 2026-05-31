import { describe, expect, it, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useCreateStoryComposer } from "./useCreateStoryComposer";
import { STORY_MEDIA_KIND } from "../storyComposer";

const {
  mockCreateStory,
  mockEditStory,
  mockSetMentionValue,
  mockUploadImage,
} = vi.hoisted(() => ({
  mockCreateStory: vi.fn(),
  mockEditStory: vi.fn(),
  mockSetMentionValue: vi.fn(),
  mockUploadImage: vi.fn(() => ({
    url: "blob:image",
    contentType: "image/png",
    name: "photo.png",
  })),
}));

let mentionValue = "";

vi.mock("../../../../hooks", () => ({
  usePostContext: () => ({
    actions: {
      createStory: (...args) => mockCreateStory(...args),
      editStory: (...args) => mockEditStory(...args),
    },
    selector: {
      loading: {
        getCreateStoryLoading: () => false,
        getEditStoryLoading: () => false,
      },
    },
  }),
}));

vi.mock("../../../../../../hooks/useMention", () => ({
  useMention: () => ({
    value: mentionValue,
    close: vi.fn(),
    setValue: mockSetMentionValue,
  }),
}));

vi.mock("../utils", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    STORY_UPLOAD_HANDLER: {
      image: (...args) => mockUploadImage(...args),
      video: vi.fn(),
      sound: vi.fn(),
    },
  };
});

describe("useCreateStoryComposer", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mentionValue = "";
    mockSetMentionValue.mockImplementation(() => {});
  });

  it("initializes with submission disabled when empty", () => {
    const { result } = renderHook(() => useCreateStoryComposer());

    expect(result.current.canSubmit).toBe(false);
    expect(result.current.media).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it("enables submission when text is provided", () => {
    mentionValue = "My story";

    const { result } = renderHook(() => useCreateStoryComposer());

    expect(result.current.canSubmit).toBe(true);
    expect(result.current.text).toBe("My story");
  });

  it("selects image media from file input", () => {
    const { result } = renderHook(() => useCreateStoryComposer());

    act(() => {
      result.current.handleSelectMedia(STORY_MEDIA_KIND.IMAGE, {});
    });

    expect(result.current.media).toMatchObject({
      kind: STORY_MEDIA_KIND.IMAGE,
      origin: "object-url",
    });
    expect(result.current.canSubmit).toBe(true);
  });

  it("removes selected media and disables submit when no text", () => {
    const { result } = renderHook(() => useCreateStoryComposer());

    act(() => {
      result.current.handleSelectMedia(STORY_MEDIA_KIND.IMAGE, {});
      result.current.handleRemoveMedia();
    });

    expect(result.current.media).toBeNull();
    expect(result.current.canSubmit).toBe(false);
  });

  it("does not submit when story is not ready", async () => {
    const onClose = vi.fn();
    const { result } = renderHook(() => useCreateStoryComposer());

    await act(async () => {
      await result.current.handleSubmit(onClose);
    });

    expect(mockCreateStory).not.toHaveBeenCalled();
    expect(onClose).not.toHaveBeenCalled();
  });

  it("submits story successfully when media is ready", async () => {
    const onClose = vi.fn();
    const { result } = renderHook(() => useCreateStoryComposer());

    act(() => {
      result.current.handleSelectMedia(STORY_MEDIA_KIND.IMAGE, {});
    });

    await act(async () => {
      await result.current.handleSubmit(onClose);
    });

    expect(mockCreateStory).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "story",
        media: expect.arrayContaining([
          expect.objectContaining({ kind: STORY_MEDIA_KIND.IMAGE }),
        ]),
      }),
      onClose
    );
  });

  it("calls editStory in edit mode", async () => {
    const onClose = vi.fn();
    mentionValue = "Updated";

    const { result } = renderHook(() =>
      useCreateStoryComposer({ mode: "edit", contentId: 99 })
    );

    await act(async () => {
      await result.current.handleSubmit(onClose);
    });

    expect(mockEditStory).toHaveBeenCalledWith(
      expect.objectContaining({ contentId: 99 }),
      onClose
    );
    expect(mockCreateStory).not.toHaveBeenCalled();
  });
});

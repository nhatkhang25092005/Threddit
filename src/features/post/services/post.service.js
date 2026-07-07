import { handleRequest } from "../../../api/helper";
import { postApi } from "../../../api/content/post/post.api";
import { profileApi } from "../../../api/profile/profile.api";
import { storageService } from "./storage.service";
import { buildEditedContentPayload, buildEditedContentPatch } from "../utils/resolveEditedContent";

const hasCursor = (cursor) =>
  cursor !== null && cursor !== undefined && cursor !== "";

const resolveSearchItems = (data, keys = []) => {
  for (const key of keys) {
    if (Array.isArray(data?.[key])) return data[key];
  }

  if (Array.isArray(data)) return data;

  return [];
};

const resolveSearchCursor = (data) =>
  data?.cursor ??
  data?.nextCursor ??
  data?.pagination?.cursor ??
  data?.pagination?.nextCursor ??
  null;

const resolveSearchHasMore = (data, items = [], cursor = null) => {
  if (items.length === 0) return false;

  if (typeof data?.hasMore === "boolean") return data.hasMore;
  if (typeof data?.pagination?.hasMore === "boolean") {
    return data.pagination.hasMore;
  }

  return hasCursor(cursor);
};

const normalizeSearchBucket = (data, keys = []) => {
  const items = resolveSearchItems(data, keys);
  const cursor = resolveSearchCursor(data);
  const hasMore = resolveSearchHasMore(data, items, cursor);

  return {
    items,
    cursor,
    hasMore,
  };
};

const normalizeEditableMediaList = (media = []) => {
  return (Array.isArray(media) ? media : []).filter(Boolean).map((item, index) => {
    // 1. Resolve the URL first so we can use it for mediaKey and validation
    const resolvedUrl = item?.url || item?.previewUrl || item?.src || null;

    // 2. Conditional check for mediaKey: if url exists and contains '/media/', extract it. Otherwise, null.
    const mediaKey = (resolvedUrl && typeof resolvedUrl === "string" && resolvedUrl.includes("/media/"))
      ? `media/${resolvedUrl.split("/media/")[1]}`
      : null;

    // 3. Resolve the item type dynamically
    let finalType = "image";
    if (typeof item?.type === "string" && !item.type.includes("/")) {
      finalType = item.type;
    } else {
      const rawType = item?.contentType || item?.file?.type || item?.type || "";
      if (typeof rawType === "string" && rawType.includes("/")) {
        finalType = rawType.split("/")[0] || "image";
      }
    }

    // 4. Return the beautifully formatted object
    return {
      ...item,
      file: item?.file || null,
      mediaKey: mediaKey,
      sortOrder: Number.isFinite(item?.sortOrder) ? item.sortOrder : index + 1,
      type: finalType,
      url: resolvedUrl,
    };
  });
};

export const postService = {
  getPostContent: async (username, cursor, signal) =>
    handleRequest(() => postApi.getPostContent(username, cursor, signal)),

  getSavedContent: async (cursor, signal) =>
    handleRequest(() => postApi.getSavedContent(cursor, signal)),

  createPost: async (data) => {
    const mediaList = (Array.isArray(data?.media) ? data.media : []).filter(
      (item) => item?.file,
    );

    let uploadSessionId = null;
    if (mediaList.length > 0) {
      const uploadResult =
        await storageService.uploadMediaAndGetSessionId(mediaList);
      if (!uploadResult?.success) {
        return {
          success: false,
          errorSource: "POST_UPLOAD_MEDIA",
          message: uploadResult.message,
        };
      }
      uploadSessionId = uploadResult.uploadSessionId;
    }

    const payload = {
      mentionedUsers: Array.isArray(data?.mentionedUsers)
        ? data.mentionedUsers
        : [],
      type: "post",
      text: data?.text ?? "",
      ...(uploadSessionId ? { uploadSessionId } : {}),
    };

    //handleRequest(createPost())
    const createResult = await handleRequest(() => postApi.createPost(payload));

    if (!createResult?.success) {
      return {
        success: false,
        message: createResult?.message || "Fail in create new post",
        errorSource: "CREATE_NEW_POST",
      };
    }
    return createResult
  },

  savePost: async (id) => handleRequest(() => postApi.savePost(id)),

  unsavePost: async (id) => handleRequest(() => postApi.unsavePost(id)),

  sharePost: async (id, payload) =>
    handleRequest(() => postApi.shareContent(id, payload)),

  unsharePost: async (id) => handleRequest(() => postApi.unshareContent(id)),

  pinContent: async (id) => handleRequest(() => postApi.pinContent(id)),

  unPinContent: async (id) => handleRequest(() => postApi.unPinContent(id)),

  editPost: async (contentId, data) => {
    const mediaList = normalizeEditableMediaList(data?.media);
    const filteredMedia = (Array.isArray(mediaList) ? mediaList : []).filter(i => i?.file);
    
    let uploadSessionId = null, presignedMediaUrls = [];
    if (filteredMedia.length > 0) {
      const uploadRes = await storageService.uploadUpdatedMediaAndGetSessionId(contentId, filteredMedia);
      if (!uploadRes?.success) return {
        success: false,
        message: uploadRes?.message || "Upload the update failed",
        errorSource: "UPLOAD"
      };
      ({ uploadSessionId, presignedMediaUrls } = uploadRes);
    }

    const { hasMissingMediaKey, payload } = buildEditedContentPayload({
      type: "post", data, mediaList, presignedMediaUrls, uploadSessionId
    });
    if (hasMissingMediaKey) return {
      success: false, message: "Could not resolve mediaKey for updated media", errorSource: "BUILD_PAYLOAD"
    };

    const result = await handleRequest(() => postApi.editContent(contentId, payload));
    if (!result.success) return {
      success: false, message: result?.message || "Can not update posts content", errorSource: "UPDATE_CONTENT_CALL"
    };

    return {
      success: true,
      message: result?.message || "Updated Successfully",
      patch: buildEditedContentPatch({ type: "post", responseData: result.data, data, mediaList: filteredMedia })
    };
  },

  deletePost: async (id) => handleRequest(() => postApi.deleteContent(id)),

  getPostDetail: async (id, signal) =>
    handleRequest(() => postApi.getPostDetail(id, signal)),

  getFeed: async (signal) => handleRequest(() => postApi.getFeed(signal)),

  getReel: async (signal) => handleRequest(() => postApi.getReel(signal)),

  search: async (key, signal, cursor = {}, scope = "all") => {
    const shouldSearchContent = scope === "all" || scope === "content";
    const shouldSearchUsers = scope === "all" || scope === "users";

    const [contentSearch, userSearch] = await Promise.all([
      shouldSearchContent
        ? handleRequest(() =>
            postApi.searchContent(key, signal, cursor?.content),
          )
        : Promise.resolve({
            success: true,
            data: null,
            message: "skip content search",
          }),
      shouldSearchUsers
        ? handleRequest(() =>
            profileApi.search_profile(key, cursor?.profile, signal),
          )
        : Promise.resolve({
            success: true,
            data: null,
            message: "skip user search",
          }),
    ]);

    if (!contentSearch.success || !userSearch.success) {
      return {
        success: false,
        message:
          [
            contentSearch.success ? null : contentSearch.message,
            userSearch.success ? null : userSearch.message,
          ]
            .filter(Boolean)
            .join("\n") || "Search failed",
      };
    }

    const contentResult = shouldSearchContent
      ? normalizeSearchBucket(contentSearch.data, [
          "contents",
          "searchItems",
          "items",
          "results",
          "feedItems",
        ])
      : { items: [], cursor: cursor?.content ?? null, hasMore: undefined };
    const userResult = shouldSearchUsers
      ? normalizeSearchBucket(userSearch.data, [
          "searchProfiles",
          "profiles",
          "users",
          "items",
          "results",
        ])
      : { items: [], cursor: cursor?.profile ?? null, hasMore: undefined };

    return {
      success: true,
      data: {
        users: userResult.items,
        content: contentResult.items,
        cursor: {
          profile: userResult.cursor,
          content: contentResult.cursor,
        },
        hasMore: {
          profile: userResult.hasMore,
          content: contentResult.hasMore,
        },
      },
      message: "success",
    };
  },
};

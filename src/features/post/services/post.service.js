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
  return (Array.isArray(media) ? media : []).filter(Boolean).map((item, index) => ({
    ...item,
    file: item?.file || null,
    mediaKey:
      item?.mediaKey ||
      item?.key ||
      item?.storageKey ||
      item?.s3Key ||
      ((item) => {
        if (!item?.url || typeof item?.url !== "string") return null;
      }),
    sortOrder: Number.isFinite(item?.sortOrder) ? item.sortOrder : index + 1,
    type: () => {
      if (typeof item?.type === "string" && !item.type.includes("/")) {
        return item.type;
      }

      const rawType = item?.contentType || item?.file?.type || item?.type || "";
      if (typeof rawType === "string" && rawType.includes("/")) {
        return rawType.split("/")[0] || "image";
      }

      return "image";
    },
    url: item?.url || item?.previewUrl || item?.src || null,
  }));
};

export const postService = {
  getPostContent: async (username, cursor, signal) =>
    handleRequest(() => postApi.getPostContent(username, cursor, signal)),

  getSavedContent: async (cursor, signal) =>
    handleRequest(() => postApi.getSavedContent(cursor, signal)),

  createPost: async (data) => {
    // check the media list
    const mediaList = (Array.isArray(data?.media) ? data.media : []).filter(
      (item) => item?.file,
    );

    // if has media => call api to get sessionId
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

    /*
      create the payload with {
        mentionUsers
        type = "post",
        text,
        uploadSessionId
      }
    */
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
    // return result and payload (the payload is using for dispatch in store)
    return {
      ...createResult,
      _payload: payload,
    };
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
    const filteredMediaList = (
      Array.isArray(mediaList) ? mediaList : []
    ).filter((item) => item?.file);
    let uploadSessionId = null;
    let presignedMediaUrls = [];
    if (filteredMediaList.length > 0) {
      const uploadResult =
        await storageService.uploadUpdatedMediaAndGetSessionId(
          contentId,
          filteredMediaList,
        );

      if (!uploadResult?.success) {
        return {
          success: false,
          message: uploadResult?.message || "Upload the update failed",
          errorSource: "UPLOAD",
        };
      }

      ((uploadSessionId = uploadResult.uploadSessionId),
        (presignedMediaUrls = uploadResult.presignedMediaUrls));
    }

    const { hasMissingMediaKey, payload } = buildEditedContentPayload({
      type: "post",
      data,
      mediaList,
      presignedMediaUrls,
      uploadSessionId,
    });

    if (hasMissingMediaKey)
      return {
        success: false,
        message: "Could not resolve mediaKey for updated media",
        errorSource: "BUILD_PAYLOAD",
      };

    const result = await handleRequest(() =>
      postApi.editContent(contentId, payload),
    );

    if (!result.success) return {
      success:false,
      message:result?.message || "Can not update posts content",
      errorSource: "UPDATE_CONTENT_CALL"
    };

    const contentPatch = buildEditedContentPatch({
      type: "post",
      responseData: result.data,
      data,
      mediaList:filteredMediaList
    })

    return {
      success:true,
      message: result?.message || "Updated Successfully",
      patch: contentPatch
    }
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

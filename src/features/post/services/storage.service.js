import { handleRequest } from "../../../api/helper"
import { storageApi } from "../../../api/content/storage.api"

export const storageService = {
  requestMediaUpload: async (mediaFileNumber) =>
    handleRequest(() => storageApi.requestMediaUpload(mediaFileNumber)),

  updateMediaUpload: async (contentId, mediaFileNumber) =>
    handleRequest(() => storageApi.updateMediaUpload(contentId, { mediaFileNumber })),

  handlePresign: async (url, payload) => {
    const contentType = payload?.contentType
      || payload?.file?.type
      || (typeof payload?.type === "string" && payload.type.includes("/") ? payload.type : null)
      || "application/octet-stream"

    try {
      await storageApi.s3_aws(url, {
        ...payload,
        type: contentType
      })

      return {
        success: true,
        message: "Uploaded"
      }
    } catch (err) {
      return {
        success: false,
        message: err?.message || "Upload media failed"
      }
    }
  },

  uploadMediaAndGetSessionId: async (mediaList = []) => {
    if (mediaList.length === 0) return { success: true, uploadSessionId: null }
    const requestResponse = await storageService.requestMediaUpload(mediaList.length)
    if (!requestResponse?.success) return requestResponse

    const uploadSessionId = requestResponse?.data?.uploadSessionId || null
    const presignedMediaUrls = Array.isArray(requestResponse?.data?.presignedMediaUrls)
      ? requestResponse.data.presignedMediaUrls
      : []

    if (!uploadSessionId || presignedMediaUrls.length !== mediaList.length) {
      return {
        success: false,
        message: "Could not create media upload session",
        data: requestResponse?.data,
      }
    }

    const uploadResults = await Promise.all(
      presignedMediaUrls.map((url, index) => storageService.handlePresign(url, mediaList[index]))
    )
    const failedUpload = uploadResults.find((result) => !result?.success)

    if (failedUpload) {
      return {
        success: false,
        message: failedUpload.message || "Media upload failed",
      }
    }

    return {
      success: true,
      uploadSessionId,
    }
  },

  uploadUpdatedMediaAndGetSessionId: async (contentId, mediaList = []) => {
    if (!contentId) {
      return {
        success: false,
        message: "contentId is required",
      }
    }

    if (mediaList.length === 0) {
      return {
        success: true,
        uploadSessionId: null,
        presignedMediaUrls: [],
      }
    }

    const requestResponse = await storageService.updateMediaUpload(contentId, mediaList.length)
    if (!requestResponse?.success) return requestResponse

    const uploadSessionId = requestResponse?.data?.uploadSessionId || null
    const presignedMediaUrls = Array.isArray(requestResponse?.data?.presignedUrls)
      ? requestResponse.data.presignedUrls
      : []

    if (!uploadSessionId || presignedMediaUrls.length !== mediaList.length) {
      return {
        success: false,
        message: "Could not create media update upload session",
        data: requestResponse?.data,
      }
    }

    const uploadResults = await Promise.all(
      presignedMediaUrls.map((url, index) => storageService.handlePresign(url, mediaList[index]))
    )
    const failedUpload = uploadResults.find((result) => !result?.success)

    if (failedUpload) {
      return {
        success: false,
        message: failedUpload.message || "Media upload failed",
      }
    }

    return {
      success: true,
      uploadSessionId,
      presignedMediaUrls,
    }
  }
}

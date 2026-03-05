import { handleRequest } from '../../../api/helper'
import { storageApi } from '../../../api/content/storage.api'

export const storageService = {
  requestMediaUpload: async (mediaFileNumber) =>
    handleRequest(() => storageApi.requestMediaUpload(mediaFileNumber)),

  handlePresign: async (url, payload) => {
    try {
      await storageApi.s3_aws(url, {
        ...payload,
        type: payload?.type || payload?.contentType || payload?.file?.type
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
        message: "Không thể tạo phiên upload media",
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
        message: failedUpload.message || "Upload media that bai",
      }
    }

    return {
      success: true,
      uploadSessionId,
    }
  }
}

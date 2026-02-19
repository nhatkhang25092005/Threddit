import { handleRequest } from '../../api/helper'
import {profileApi} from '../../api/profile/profile.api'
import {
  mapConfirmAvatar,
  mapConfirmBackgroundImage,
  mapPresignAvatar,
  mapPresignBackgroundImage,
  mapS3Aws,
  mapUpdateProfile
} from '../../api/profile/profile.map'

import {
  followLoading,
  followSuccess,
  unfollowSuccess,
  increaseFriendNumber,
  decreaseFriendNumber,
  setFriendStatus,
  setMutualNumber,
  setMutualNumberLoading,
} from "./actions"


const api = {
  getProfileInfo: async (username) =>
    handleRequest(() => profileApi.get_profile(username)),

  presignBackgroundImage: async (data) => {
    const payload = mapPresignBackgroundImage(data)
    return handleRequest(() => profileApi.presign_background_image(payload))
  },

  confirmBackgroundImage: async (data) => {
    const payload = mapConfirmBackgroundImage(data.key)
    const s3payload = mapS3Aws(data)

    try {
      await profileApi.s3_aws(data.singedUrl, s3payload)
    } catch (e) {
      console.error(e)
      return {
        success: false,
        message: 'Lỗi xảy ra trong quá trình thay đổi ảnh, vui lòng thử lại sau'
      }
    }

    return handleRequest(() => profileApi.confirm_background_image(payload))
  },

  confirmAvatar: async (data) => {
    const payload = mapConfirmAvatar(data)
    const s3payload = mapS3Aws(data)

    try {
      await profileApi.s3_aws(data.singedUrl, s3payload)
    } catch (e) {
      console.error(e)
      return {
        success: false,
        message: 'Lỗi xảy ra trong quá trình thay đổi ảnh, vui lòng thử lại sau'
      }
    }

    return handleRequest(() => profileApi.confirm_avatar_image(payload))
  },

  presignAvatar: async (data) => {
    const payload = mapPresignAvatar(data)
    return handleRequest(() => profileApi.presign_avatar_image(payload))
  },

  editProfile: async (data) => {
    const payload = mapUpdateProfile(data)
    return handleRequest(() => profileApi.update_profile(payload))
  },
}

const domain = {
  createFollowSync : (dispatch) => ({
    setFollowLoading(bool){ dispatch(followLoading(bool)) },
    followSuccess(){ dispatch(followSuccess()) },
    unfollowSuccess(){ dispatch(unfollowSuccess()) },
  }),

  createFriendSync : (dispatch) => ({
    increaseFriendNumber(){ dispatch(increaseFriendNumber()) },
    decreaseFriendNumber(){ dispatch(decreaseFriendNumber()) },
    setFriendStatus(status){ dispatch(setFriendStatus(status)) },
    setMutualNumber(number){ dispatch(setMutualNumber(number)) },
    setMutualNumberLoading(loading){ dispatch(setMutualNumberLoading(loading)) }
  }),
}

export const services = {
  ...api,
  ...domain
}
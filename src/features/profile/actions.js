import { formatToYYYYMMDD } from "../../utils/formatDate"

export const ACTIONS = {
  // Profile actions
  SET_PROFILE:'set_profile',
  GET_PROFILE_LOADING:'get_profile_loading',
  
  PRESIGN_BACKGROUND_IMAGE_LOADING:'update_background_image_loading',
  UPDATE_BACKGROUND:"update_background",
  CONFIRM_BACKGROUND_IMAGE_LOADING:'confirm_background_image_loading',
  
  PRESIGN_AVATAR_LOADING:'presign_avatar_loading',
  CONFIRM_AVATAR_LOADING:'confirm_avatar_loading',
  UPDATE_AVATAR:'update_avatar',
  
  UPDATE_BIO_LOADING:'update_bio_loading',
  UPDATE_BIO_SUCCESS:'update_bio_success',

  UPDATE_DISPLAY_NAME_LOADING:'update_display_name_loading',
  UPDATE_DISPLAY_NAME_SUCCESS:'update_display_name_success',

}

export const setProfile = (profileData) => ({
  type:ACTIONS.SET_PROFILE,
  payload:profileData
})

export const getProfileLoading = (isLoading) => ({
  type:ACTIONS.GET_PROFILE_LOADING,
  payload:isLoading
})

export const presignBackgroundImageLoading = (isLoading) => ({
  type:ACTIONS.PRESIGN_BACKGROUND_IMAGE_LOADING,
  payload:isLoading
})

export const updateBackground = (data) => ({
  type: ACTIONS.UPDATE_BACKGROUND,
  payload:data
})

export const confirmBackgroundImageLoading = (isLoading) => ({
  type:ACTIONS.CONFIRM_BACKGROUND_IMAGE_LOADING,
  payload:isLoading
})

export const presignAvatarLoading = (isLoading) => ({
  type:ACTIONS.PRESIGN_AVATAR_LOADING,
  payload:isLoading
})

export const confirmAvatarLoading = (isLoading) => ({
  type:ACTIONS.CONFIRM_AVATAR_LOADING,
  payload:isLoading
})

export const updateAvatar = (url) => ({
  type:ACTIONS.UPDATE_AVATAR,
  payload:url
})

export const editBioLoading = (isLoading) => ({
  type:ACTIONS.UPDATE_BIO_LOADING,
  payload:isLoading
})

export const editBioSuccess = (data) => ({
  type:ACTIONS.UPDATE_BIO_SUCCESS,
  payload:{
    gender:data.gender,
    birth:formatToYYYYMMDD(data.birth),
    educationalLevel:data.educationalLevel,
    relationshipStatus:data.relationshipStatus
  }
})

export const editDisplaynameLoading = (isLoading) => ({
  type:ACTIONS.UPDATE_DISPLAY_NAME_LOADING,
  payload : isLoading
})

export const editDisplaynameSuccess = (newDisplayname) => ({
  type:ACTIONS.UPDATE_DISPLAY_NAME_SUCCESS,
  payload:newDisplayname
})
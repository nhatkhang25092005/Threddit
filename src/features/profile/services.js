import {profileApi} from '../../api/profile/profile.api'
import {
  mapConfirmAvatar,
  mapConfirmBackgroundImage,
  mapPresignAvatar,
  mapPresignBackgroundImage,
  mapS3Aws,
  mapUpdateProfile
} from '../../api/profile/profile.map'
import { mapResponse, mapErrResponse } from '../../api/helper'


export const services = {
  getProfileInfo : async (username) => {
    try{
      const res = mapResponse(await profileApi.get_profile(username))
      return{
        success:res.is_success,
        message:res.message,
        data:res.data
      }
    }
    catch(err){
      return mapErrResponse(err)
    }
  },

  presignBackgroundImage : async (data) => {
    const payload = mapPresignBackgroundImage(data)
    try{
      const res = mapResponse(await profileApi.presign_background_image(payload))
      return{
        success:res.is_success,
        message:res.message,
        data:res.data
      }
    }
    catch(err){
      return mapErrResponse(err)
    }
  },

  confirmBackgroundImage : async (data) => {
    const payload = mapConfirmBackgroundImage(data.key)
    const s3payload = mapS3Aws(data)

    try{
      await profileApi.s3_aws(data.singedUrl, s3payload)
    }
    catch(e){
      console.error(e)
      return{
        success:false,
        message:'Lỗi xảy ra trong quá trình thay đổi ảnh, vui lòng thử lại sau'
      }
    }

    try{
      const res = mapResponse(await profileApi.confirm_background_image(payload))
      return{
        success:res.is_success,
        data:res.data,
        message:res.message
      }
    }
    catch(e){
      return mapErrResponse(e)
    }
  },

  confirmAvatar:async (data) => {
    const payload =mapConfirmAvatar(data)
    const s3payload = mapS3Aws(data)
    try{
      await profileApi.s3_aws(data.singedUrl, s3payload)
    }
    catch(e){
      console.error(e)
      return{
        success:false,
        message:'Lỗi xảy ra trong quá trình thay đổi ảnh, vui lòng thử lại sau'
      }
    }

    try{
      const res = mapResponse(await profileApi.confirm_avatar_image(payload))
      return{
        success:res.is_success,
        data:res.data,
        messgage:res.message
      }
    }
    catch(e){
      return mapErrResponse(e)
    }
  },

  presignAvatar : async (data) => {
    const payload = mapPresignAvatar(data)
    try{
      const res = mapResponse(await profileApi.presign_avatar_image(payload))
      return{
        success:res.is_success,
        message:res.message,
        data:res.data
      }
    }
    catch(e){
      return mapErrResponse(e)
    }
  },

  editProfile : async (data) => {
    const payload = mapUpdateProfile(data)
    try{
      const res = mapResponse(await profileApi.update_profile(payload))
      return{
        success:res.is_success,
        message:res.message,
      }
    }
    catch(e){
      return mapErrResponse(e)
    }
  }
}
import {accountApi} from '../../api/account/account.api'
import {mapResponse, mapErrResponse} from '../../api/helper'
import {validate} from './validate'
import {mapDeleteAccountVerify, mapUpdatePassword} from '../../api/account/account.map'
// import {delay} from '../../utils/delaySimulator'

export const services = {
  getUserInfo : async () => {
    try{
      const res = mapResponse(await accountApi.get_user_info())
      return{
        success:res.is_success,
        message:res.message,
        data:res.data
      }
    }
    catch(e){
      const err = mapErrResponse(e)
      return {
        success:err.is_success,
        message:err.message
      }
    }
  },

  updateUsername :async (username) => {
    try{
      const res = mapResponse(await accountApi.update_username({username}))
      return{
        success:res.is_success,
        message:res.message
      }
    }
    catch(e){
      const err = mapErrResponse(e)
      return{
        success:err.is_success,
        message:err.message
      }
    }
  },
  
  updatePassword:async (form) => {
    const validation = validate.updatePassword(form)
    if(!validation.success){
      return validation
    }

    const payload = mapUpdatePassword(form)
    try{
      const res = mapResponse(await accountApi.update_password(payload))
      return{
        success:res.is_success,
        message:res.message
      }
    }
    catch(e){
      const err = mapErrResponse(e)
      return{
        success:err.is_success,
        message:err.message
      }
    }
  

  },

  deleteAccountRequest:async () => {
    try{
      const res = mapResponse(await accountApi.delete_account_request())
      return{
        success:res.is_success,
        message:res.message
      }
    }
    catch(e){
      const err = mapErrResponse(e)
      return{
        success:err.is_success,
        message:err.message
      }
    }
  },

  deleteAccountVerify: async(code) => {
    const payload = mapDeleteAccountVerify({code:code})
    try{
      const res = mapResponse(await accountApi.delete_account_verify(payload))
      return{
        success:res.is_success,
        message:res.message
      }
    }
    catch(e){
      const err = mapErrResponse(e)
      return{
        success:err.is_success,
        message:err.message
      }
    }
  },

  logout : async () => {
    try{
      const res = mapResponse( await accountApi.signout())
      return{
        success:res.is_success,
        message:res.message
      }
    }
    catch(e){
      const err = mapErrResponse(e)
      return{
        success:err.is_success,
        message:err.message
      }
    }
  }
}
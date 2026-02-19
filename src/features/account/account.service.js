import { handleRequest } from '../../api/helper'
import {accountApi} from '../../api/account/account.api'
import {validate} from './validate'
import {mapDeleteAccountVerify, mapUpdatePassword} from '../../api/account/account.map'

export const services = {
  getUserInfo: async () =>
    handleRequest(() => accountApi.get_user_info()),

  updateUsername: async (username) =>
    handleRequest(() => accountApi.update_username({username})),

  updatePassword: async (form) => {
    const validation = validate.updatePassword(form)
    if (!validation.success) {
      return validation
    }

    const payload = mapUpdatePassword(form)
    return handleRequest(() => accountApi.update_password(payload))
  },

  deleteAccountRequest: async () =>
    handleRequest(() => accountApi.delete_account_request()),

  deleteAccountVerify: async (code) => {
    const payload = mapDeleteAccountVerify({code: code})
    return handleRequest(() => accountApi.delete_account_verify(payload))
  },

  logout: async () =>
    handleRequest(() => accountApi.signout()),
}
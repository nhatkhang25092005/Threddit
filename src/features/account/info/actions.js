export const ACTIONS = {
  UPDATE_USERNAME:'update_username',
  UPDATE_USERNAME_LOADING:'update_username_loading',
  GET_INFO_LOADING:'get_info_loading',
  SET_ACCOUNT_DATA:'set_account_data'
}

export const syncUsername = (username) => ({
  type:ACTIONS.UPDATE_USERNAME,
  payload:username
})

export const updateUsernameLoading = (bool) => ({
  type:ACTIONS.UPDATE_USERNAME_LOADING,
  payload:bool
})

export const getInfoLoading = (bool) => ({
  type:ACTIONS.GET_INFO_LOADING,
  payload:bool
})

export const setAccountData = ({username, email, authMethod}) => {
  return{
    type: ACTIONS.SET_ACCOUNT_DATA,
    payload: {username, email, authMethod}
  }
}
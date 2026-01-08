import {ACTIONS} from './actions'
import { account } from "../../../constant/text/vi/account.text"
export const initState = () =>({
  username:account.default_data.username,
  email:account.default_data.email,
  method:account.default_data.method,
  loading:{
    get_info:false,
    update_username:false
  }
})

export const reducer = (state, action) => {
  switch(action.type){
    case ACTIONS.UPDATE_USERNAME:
      return{
        ...state,
        username:action.payload
      }
    case ACTIONS.GET_INFO_LOADING:
      return{
        ...state,
        loading:{
          update_username:false,
          get_info:action.payload
        }
      }
    case ACTIONS.UPDATE_USERNAME_LOADING:{
      return{
        ...state,
        loading:{
          get_info:false,
          update_username:action.payload
        }
      }
    }
    case ACTIONS.SET_ACCOUNT_DATA:{
      return{
        ...state,
        username:action.payload.username,
        email:action.payload.email,
        method:action.payload.authMethod,
      }
    }
  }
}
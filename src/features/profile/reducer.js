import { profile } from "../../constant/text/vi/profile.text"
import { ACTIONS } from "./actions"
const textDefault = profile.default
export const initState = {
  displayName: textDefault.display_name,
  dateOfBirth: textDefault.date_of_birth,
  gender: textDefault.gender,
  email: textDefault.email,
  friendNumber:textDefault.num_of_friends,
  followerNumber:textDefault.num_of_followers,
  followingNumber:textDefault.num_of_followings,
  avatarUrl: textDefault.avatar_url,
  backgroundImageUrl: textDefault.background_image_url,
  educationalLevel:'',
  relationshipStatus:'',
  loading:{
    get_profile:false,
    update_background_image:false,
    update_avatar:false,
    update_profile:false,
    update_displayname:false
  }
}

export const reducer = (state, action) => {
  switch(action.type){

    // Profile
    case ACTIONS.SET_PROFILE:{
      return{
        ...state,
        displayName:action.payload.displayName,
        dateOfBirth:action.payload.dateOfBirth,
        gender:action.payload.gender,
        email:action.payload.email,
        avatarUrl:action.payload.avatarUrl,
        backgroundImageUrl:action.payload.backgroundImageUrl,
        followerNumber:action.payload.followerNumber,
        followingNumber:action.payload.followingNumber,
        friendNumber:action.payload.friendNumber,
        educationalLevel:action.payload.educationalLevel,
        relationshipStatus:action.payload.relationshipStatus
      }
    }
      
    case ACTIONS.GET_PROFILE_LOADING:
      return{
        ...state,
        loading:{
          ...state.loading,
          get_profile:action.payload
        }
      }

    case ACTIONS.UPDATE_BIO_LOADING:
      return{
        ...state,
        loading:{
          update_profile:action.payload
        }
      }
    
    case ACTIONS.UPDATE_BIO_SUCCESS:
      return{
        ...state,
        gender:action.payload.gender,
        dateOfBirth:action.payload.birth,
        educationalLevel:action.payload.educationalLevel,
        relationshipStatus:action.payload.relationshipStatus
      }

    case ACTIONS.UPDATE_DISPLAY_NAME_LOADING:
      return{
        ...state,
        loading:{
          ...state.loading,
          update_displayname:action.payload
        }
      }

    case ACTIONS.UPDATE_DISPLAY_NAME_SUCCESS:
      return{
        ...state,
        displayName:action.payload
      }
    
      // Background
    case ACTIONS.PRESIGN_BACKGROUND_IMAGE_LOADING:
      return{
        ...state,
        loading:{
          ...state.loading,
          update_background_image:action.payload
        }
      }

    case ACTIONS.UPDATE_BACKGROUND:
      return{
        ...state,
        backgroundImageUrl:`${action.payload}?t=${Date.now()}`
      }

    case ACTIONS.CONFIRM_BACKGROUND_IMAGE_LOADING:
      return{
        ...state,
        loading:{
          ...state.loading,
          update_background_image:action.payload
        }
      }

    //Avatar
    case ACTIONS.PRESIGN_AVATAR_LOADING:
      return{
        ...state,
        loading:{
          ...state.loading,
          update_avatar:action.payload
        }
      }

    case ACTIONS.CONFIRM_AVATAR_LOADING:
      return{
        ...state,
        loading:{
          ...state.loading,
          update_avatar:action.payload
        }
      }

    case ACTIONS.UPDATE_AVATAR:
      return{
        ...state,
        avatarUrl:`${action.payload}?t=${Date.now()}`
      }
  }
}

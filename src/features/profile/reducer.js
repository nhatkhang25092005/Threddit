import { profile } from "../../constant/text/vi/profile.text"
import { ACTIONS } from "./actions"
const textDefault = profile.default
export const initState = {
  displayName: textDefault.display_name,
  dateOfBirth: textDefault.date_of_birth,
  username:null,
  gender: textDefault.gender,
  email: textDefault.email,
  friendNumber:textDefault.num_of_friends,
  followerNumber:textDefault.num_of_followers,
  followingNumber:textDefault.num_of_followings,
  avatarUrl: textDefault.avatar_url,
  backgroundImageUrl: textDefault.background_image_url,
  educationalLevel:'',
  relationshipStatus:'',
  friendshipStatus:null,
  isFollowing:false,
  mutualNumber:0,
  loading:{
    get_profile:false,
    get_mutual_number:false,
    update_background_image:false,
    update_avatar:false,
    update_profile:false,
    update_displayname:false,
    follow:false
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
        username:action.payload.username,
        email:action.payload.email,
        avatarUrl:`${action.payload.avatarUrl}?t=${Date.now()}`,
        backgroundImageUrl:`${action.payload.backgroundImageUrl}?t=${Date.now()}`,
        followerNumber:action.payload.followerNumber,
        followingNumber:action.payload.followingNumber,
        friendNumber:action.payload.friendNumber,
        educationalLevel:action.payload.educationalLevel,
        relationshipStatus:action.payload.relationshipStatus,
        isFollowing: action.payload.isFollowing,
        friendshipStatus: action.payload.friendshipStatus
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

    // Follow
    case ACTIONS.FOLLOW_LOADING:
    case ACTIONS.UNFOLLOW_LOADING:
      return {
        ...state,
        loading:{
          ...state.loading,
          follow: action.payload
        }
      }

    case ACTIONS.FOLLOW_SUCCESS:
      return {
        ...state,
        isFollowing: true,
        followerNumber: state.followerNumber + 1
      }

    case ACTIONS.UNFOLLOW_SUCCESS:
      return {
        ...state,
        isFollowing: false,
        followerNumber: Math.max(0, state.followerNumber - 1)
      }

    // Friend
    case ACTIONS.SET_FRIEND_STATUS:
      return {
        ...state,
        friendshipStatus: action.payload
      }

    case ACTIONS.INCREASE_FRIEND_NUMBER:
      return {
        ...state,
        friendNumber: state.friendNumber + 1
      }

    case ACTIONS.DECREASE_FRIEND_NUMBER:
      return {
        ...state,
        friendNumber: Math.max(0, state.friendNumber - 1)
      }

    // mutual
    case ACTIONS.SET_MUTUAL_NUMBER:
      return {
        ...state,
        mutualNumber: action.payload
      }

    case ACTIONS.SET_MUTUAL_NUMBER_LOADING:
      return{
        ...state,
        loading:{
          get_mutual_number:action.payload
        }
      }
    
    default: return state
  }
}

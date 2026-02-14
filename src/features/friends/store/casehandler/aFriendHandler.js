import { A_FRIEND_ACTIONS } from "../type"
const { REQUEST } = A_FRIEND_ACTIONS
export const aFriendHandler = (state, action)=>{
  switch(action.type){
    case REQUEST:
      return{
        ...state,
        requestList:[action.payload, ...state.requestList]
      }
  }
}
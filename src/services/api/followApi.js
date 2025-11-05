import axiosClient from "../axiosClient";

const followApi = {
  // get the follow number of a client
  getFollowNumberOfClient: (username) =>
    axiosClient.get(
      import.meta.env.VITE_API_FOLLOW + `/${username}` + import.meta.env.VITE_API_COUNT_FOLLOW
    ),
  
  // follow a client
  followClient : (username) => 
    axiosClient.post(
      import.meta.env.VITE_API_FOLLOW + `/${username}`
  ),

  // get follow state
  getFollowState : (username) => 
    axiosClient.get(
      import.meta.env.VITE_API_FOLLOW + `/${username}` + import.meta.env.VITE_API_FOLLOW_STATE
  ),

  // unfollow 
  unfollowClient : (username)=>
    axiosClient.delete(
      import.meta.env.VITE_API_FOLLOW + `/${username}`
  ),

  //get the follow number of user
  getFollowNumberOfUser: () =>
    axiosClient.get(
      import.meta.env.VITE_API_FOLLOW + `/me` + import.meta.env.VITE_API_COUNT_FOLLOW
  ),

  // get the follower list
  getFollowerList : (target, cursor) => {
    target ? undefined : target = 'me'
    const url = import.meta.env.VITE_API_FOLLOW + `/${target}` + import.meta.env.VITE_API_GET_FOLLOWERS
    const finalUrl = cursor ? `${url}?cursor=${cursor}` : url
    return axiosClient.get(finalUrl)
  },

  // get the following list
  getFollowingList : (target, cursor) => {
    target ? undefined : target = 'me'
    const url = import.meta.env.VITE_API_FOLLOW + `/${target}` + import.meta.env.VITE_API_GET_FOLLOWING
    const finalUrl = cursor ? `${url}?cursor=${cursor}` : url
    return axiosClient.get(finalUrl)
  }
};

export default followApi;

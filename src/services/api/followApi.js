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
};

export default followApi;

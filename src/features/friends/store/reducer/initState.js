export const initState = {
  friendList: [],
  requestList:[],
  sentList:[],
  mutualList:[],
  requestCount: 0,
  sentCount: 0,

  hasMore:{
    friend_list:true,
    request_list:true,
    sent_list:true,
    mutual_list:true,
  },

  loading:{
    global:{
      get_friendship_status: false,
      get_friend_list:false,
      get_request_list:false,
      get_request_number:false,
      get_sent_list:false,
      get_sent_number:false,
      get_mutual_list:false,
      request_friend:false,
      unfriend:false,
    },

    perFriend:{
      // [friendId]:{
      //   delete_friend: false,
      // }
    },

    perRequest:{
      // [friendshipId]:{
      //   accept_request: false,
      //   reject_request: false,
      // }
    }
  }
}
export const initState = {
  pinnedContents:{
    story:{},
    post:{}
  },
  postById:{},
  storyList:{}, // [username]: [contentId]
  contentList:{
    home:{
      feeds:[],
      followersPost:[]
    },
    usersPost:{}, // [username] -> [1, 2, 3]
    savedPost:[]
  },
  mySavedHasMore:true,
  userPostHasMore:{
    //[username]:boolean
  },
  loading:{
    global:{
      createPost:false,
      presign:false,
      getFeeds:false,
      getFollowPost:false,
      share:false,
      getUserPost:false
    },
    item:{
      //[id] : itemModel()
    }
  }

  /**
   *
   *
   *  LIKE = 'like',
      LOVE = 'love',
      HAHA = 'haha',
      WOW = 'wow',
      SAD = 'sad',
      ANGRY = 'angry',
   */
}

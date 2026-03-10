export const initState = {
  pinnedContents:{
    story:{},// [username]: [contentId]
    post:[], //just my pinned post
  },
  postById:{},
  storyById:{},
  contentList:{
    home:{
      feeds:[],
      followersPost:[]
    },
    usersPost:{}, // [username] -> [1, 2, 3]
    savedPost:[]
  },
  mySavedHasMore:undefined,
  userPostHasMore:{
    //[username]:boolean
  },
  loading:{
    global:{
      createPost:false,
      createStory:false,
      presign:false,
      getFeeds:false,
      getFollowPost:false,
      share:false,
      getSavedPost:false,
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

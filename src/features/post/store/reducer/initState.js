export const initState = {
  pinnedContents:{
    story:{},// [username]: [contentId]
    post:[], //just my pinned post
  },
  postById:{},
  storyById:{},
  storyList:{},
  commentById:{},
  contentList:{
    home:{
      feeds:[],
      followersPost:[]
    },
    usersPost:{}, // [username] -> [1, 2, 3]
    savedPost:[],
    currentStory:{},
    friendStories:{
      //[username]:[1, 2, 3] (storyById)
    },
    reel:[],
    searchList:[]
  },

  commentList:{
    //[postId]:[commentById]
  },

  subCommentList:{
    //[commentId]:[commentById]
  },
  
  mySavedHasMore:undefined,
  feedHasMore:undefined,
  reelHasMore:undefined,
  searchHasMore:undefined,
  searchKeyword:"",
  userPostHasMore:{
    //[username]:boolean
  },
  loading:{
    global:{
      createPost:false,
      createStory:false,
      editPost:false,
      editStory:false,
      presign:false,
      getFeeds:false,
      getReels:false,
      getFollowPost:false,
      share:false,
      getSavedPost:false,
      getCommentList:false,
      getUserPost:false,
      getSearch:false
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

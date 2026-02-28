export const initState = {
  postById:{},
  timelineById:{},
  contentList:{
    home:{
      feeds:[],
      followersPost:[]
    },
    usersPost:{}, // [username] -> [1, 2, 3]
    savedPost:[]
  },
  hasMore:{
    //[username]:boolean
  },
  loading:{
    global:{
      createPost:false,
      presign:false,
      getFeeds:false,
      getFollowPost:false,
      share:false
    },
    item:{
      //username : itemModel()
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
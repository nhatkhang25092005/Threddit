export const initState = {
  // Block List
  blockList: [],
  hasMore: true,
  loading:{
    global:{
      getBlockList:false,
      blockUser:false,
      getBLockStatusOnProfile:false
    },
    perBlock:{
      cancelBlock:{
        // [username]:boolean
      }
    }
  }
}
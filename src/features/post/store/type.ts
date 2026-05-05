export const CLASS_TYPE = {
  POST_BY_ID:'post by id',
  STORY_BY_ID:'story by id',
  COMMENT:'comment',
  STORY:'story',
  FEEDS:'feeds',
  REEL:'reel',
  FOLLOWERS_POST:'followers post',
  USERS_POST:'users post',
  SAVED_POST:'saved post',
  REACTION:'reaction',
  LOADING:'LOADING',
  HAS_MORE:'HAS MORE',
  PIN:"PIN",
  SEARCH:"SEARCH"
} as const

export const LOADING = {
  GET_DETAIL_POST:"get detail post",
  GET_FEED_LIST:"get feed list",
  GET_REEL_LIST:"get reel list",
  GET_SEARCH_LIST:"get search list",
  GET_POST_LIST:"get post list",
  GET_SAVED_LIST:"get saved list",
  GET_COMMENT_LIST:"get comment list",
  SET_COMMENT_LOADING: "set comment loading",
  SET_POST_SAVE_LOADING: "set post save loading",
  SET_POST_SHARE_LOADING: "set post share loading",
  SET_POST_PIN_LOADING: "set post pin loading",
  SET_CONTENT_DELETE_LOADING: "set content delete loading",
  SET_EDIT_POST_LOADING: "set edit post loading",
  SET_EDIT_STORY_LOADING: "set edit story loading",
  SET_CREATE_POST_LOADING: "set create post loading",
  SET_CREATE_STORY_LOADING: "set create story loading",
  SET_PRESIGN_LOADING: "set presign loading",
} as const

export const HAS_MORE = {
  SET_USERS_POST_HAS_MORE:'SET USER POSTS HAS MORE',
  INIT_USERS_POST_HAS_MORE:'INIT USER POSTS HAS MORE',
  SET_SAVED_HAS_MORE:'SET SAVED HAS MORE',
  SET_FEED_HAS_MORE:'SET FEED HAS MORE',
  SET_REEL_HAS_MORE:'SET REEL HAS MORE',
  SET_SEARCH_HAS_MORE:'SET SEARCH HAS MORE',
  SET_SEARCH_USERS_HAS_MORE:'SET SEARCH USERS HAS MORE',
} as const

export const POST_BY_ID = {
  ADD_POSTS_BY_ID : 'ADD POST BY ID',
  ADD_POST_BY_ID: 'ADD POST BY ID ITEM',
  UPDATE_POST_BY_ID: 'UPDATE POST BY ID ITEM',
  INCREASE_POST_COMMENT_NUMBER: 'INCREASE POST COMMENT NUMBER',
  SET_POST_SAVED: 'SET POST SAVED',
  SET_POST_SHARED: 'SET POST SHARED',
  SET_POST_PINNED: 'SET POST PINNED',
  REMOVE_POST_BY_ID: 'REMOVE POST BY ID ITEM',
} as const

export const STORY_BY_ID = {
  ADD_STORIES_BY_ID: 'ADD STORIES BY ID',
  ADD_STORY_BY_ID: 'ADD STORY BY ID ITEM',
  UPDATE_STORY_BY_ID: 'UPDATE STORY BY ID ITEM',
  SET_STORY_PINNED: 'SET STORY PINNED',
  REMOVE_STORY_BY_ID: 'REMOVE STORY BY ID ITEM',
} as const

export const STORY = {
  SET_STORY_LIST: 'SET STORY LIST',
  ADD_STORY_INDEX: 'ADD STORY INDEX',
  ADD_FRIEND_STORY_INDEX: 'ADD FRIEND STORY INDEX',
  PREPEND_STORY_INDEX: 'PREPEND STORY INDEX',
  CLEAR_STORY_LIST: 'CLEAR STORY LIST',
  CLEAR_FRIEND_STORY_LIST: 'CLEAR FRIEND STORY LIST',
  SET_PIN_STORY:"SET PIN STORY",
  PREPEND_CURRENT_STORY_INDEX:'PREPEND CURRENT STORY INDEX'
} as const

export const FEEDS = {
  SET_TIMELINE_INDEX: "SET FEEDS TIMELINE INDEX",
  ADD_TIMELINE_INDEX: "ADD FEEDS TIMELINE INDEX",
} as const

export const REEL = {
  SET_TIMELINE_INDEX: "SET REEL TIMELINE INDEX",
  ADD_TIMELINE_INDEX: "ADD REEL TIMELINE INDEX",
} as const

export const USERS_POST = {
  ADD_TIMELINE_INDEX: "ADD USERS POST TIMELINE INDEX",
  PREPEND_TIMELINE_INDEX: "PREPEND USERS POST TIMELINE INDEX",
  SET_TIMELINE_INDEX: "SET USERS POST TIMELINE INDEX",
  REMOVE_USERS_POST:'REMOVE_USERS_POST'
} as const

export const SAVED_POST = {
  ADD_TIMELINE_INDEX: "ADD SAVED POST TIMELINE INDEX",
  PREPEND_TIMELINE_INDEX: "PREPEND SAVED POST TIMELINE INDEX",
  REMOVE_TIMELINE_INDEX: "REMOVE SAVED POST TIMELINE INDEX"
} as const

export const REACTION = {
  SET_POST_REACTION: 'SET POST REACTION',
  SET_COMMENT_REACTION: 'SET COMMENT REACTION',
} as const

export const PIN = {
  SET_PIN_LIST:'SET PIN LIST'
} as const

export const COMMENT = {
  ADD_COMMENTS_BY_ID: "ADD_COMMENTS_BY_ID",
  ADD_COMMENT_BY_ID: "ADD_COMMENT_BY_ID",
  UPDATE_COMMENT_BY_ID: "UPDATE_COMMENT_BY_ID",
  REMOVE_COMMENT_BY_ID: "REMOVE_COMMENT_BY_ID",
  SET_POST_COMMENT_INDEX: "SET_POST_COMMENT_INDEX",
  ADD_POST_COMMENT_INDEX: "ADD_POST_COMMENT_INDEX",
  SET_SUB_COMMENT_INDEX: "SET_SUB_COMMENT_INDEX",
  ADD_SUB_COMMENT_INDEX: "ADD_SUB_COMMENT_INDEX",
} as const

export const SEARCH = {
  SET_SEARCH_KEYWORD:'SET SEARCH KEYWORD',
  SET_SEARCH_LIST:'SET SEARCH LIST',
  APPEND_SEARCH_LIST:'APPEND SEARCH LIST',
  SET_SEARCH_USERS:'SET SEARCH USERS',
  APPEND_SEARCH_USERS:'APPEND SEARCH USERS',
} as const

export type ClassType = typeof CLASS_TYPE[keyof typeof CLASS_TYPE]

export type LoadingType = typeof LOADING[keyof typeof LOADING]
export type PostByIdType = typeof POST_BY_ID[keyof typeof POST_BY_ID]
export type StoryByIdType = typeof STORY_BY_ID[keyof typeof STORY_BY_ID]
export type StoryType = typeof STORY[keyof typeof STORY]
export type FeedsType = typeof FEEDS[keyof typeof FEEDS]
export type UserPostType = typeof USERS_POST[keyof typeof USERS_POST]
export type SavedPostType = typeof SAVED_POST[keyof typeof SAVED_POST]
export type ReactionType = typeof REACTION[keyof typeof REACTION]
export type PinType = typeof PIN[keyof typeof PIN]
export type CommentType = typeof COMMENT[keyof typeof COMMENT]
export type SearchType = typeof SEARCH[keyof typeof SEARCH]
export type HasMoreType = typeof HAS_MORE[keyof typeof HAS_MORE]
export type ReelType = typeof REEL[keyof typeof REEL]

export type ActionMap = {
  [CLASS_TYPE.FEEDS]: FeedsType,
  [CLASS_TYPE.COMMENT]: CommentType
  [CLASS_TYPE.POST_BY_ID]: PostByIdType
  [CLASS_TYPE.STORY_BY_ID]: StoryByIdType
  [CLASS_TYPE.STORY]: StoryType
  [CLASS_TYPE.USERS_POST]: UserPostType
  [CLASS_TYPE.SAVED_POST]: SavedPostType
  [CLASS_TYPE.REACTION]: ReactionType
  [CLASS_TYPE.PIN]: PinType
  [CLASS_TYPE.SEARCH]: SearchType
  [CLASS_TYPE.HAS_MORE]: HasMoreType
  [CLASS_TYPE.REEL]: ReelType
  [CLASS_TYPE.LOADING]: LoadingType
}

export type Action<
  C extends ClassType & keyof ActionMap,
  T
> ={
  actionClass:C,
  type:ActionMap[C],
  payload?:T
}


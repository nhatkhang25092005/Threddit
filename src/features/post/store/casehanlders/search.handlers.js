import { SEARCH } from "../type"

const resolveSearchUserKey = (user) => (
  user?.username ?? user?.id ?? null
)

const resolveTimelineIndexes = (currentIndexes = [], timelineIndexList = [], mode = "set") => {
  const nextIndexes = (timelineIndexList || []).filter(
    (timelineId) => timelineId != null
  )

  if (mode === "add") {
    return [...new Set([...currentIndexes, ...nextIndexes])]
  }

  return [...new Set(nextIndexes)]
}

const resolveSearchUsers = (currentUsers = [], userList = [], mode = "set") => {
  const source = mode === "add"
    ? [...currentUsers, ...(Array.isArray(userList) ? userList : [])]
    : (Array.isArray(userList) ? userList : [])
  const nextUsers = []
  const userSet = new Set()

  source.forEach((user) => {
    const userKey = resolveSearchUserKey(user)

    if (userKey == null || userSet.has(userKey)) return

    userSet.add(userKey)
    nextUsers.push(user)
  })

  return nextUsers
}

export const searchHandlers = (state, action) => {
  switch (action.type) {
    case SEARCH.SET_SEARCH_KEYWORD: {
      const { keyword = "" } = action.payload || {}

      return {
        ...state,
        searchKeyword: keyword,
      }
    }

    case SEARCH.SET_SEARCH_LIST: {
      const { timelineIndexList } = action.payload || {}
      const nextIndexes = resolveTimelineIndexes([], timelineIndexList)

      return {
        ...state,
        contentList: {
          ...state.contentList,
          searchList: nextIndexes,
        }
      }
    }

    case SEARCH.APPEND_SEARCH_LIST: {
      const { timelineIndexList } = action.payload || {}
      const currentIndexes = state.contentList.searchList ?? []
      const nextIndexes = resolveTimelineIndexes(currentIndexes, timelineIndexList, "add")

      return {
        ...state,
        contentList: {
          ...state.contentList,
          searchList: nextIndexes,
        }
      }
    }

    case SEARCH.SET_SEARCH_USERS: {
      const { users } = action.payload || {}
      const nextUsers = resolveSearchUsers([], users)

      return {
        ...state,
        contentList: {
          ...state.contentList,
          searchUsers: nextUsers,
        }
      }
    }

    case SEARCH.APPEND_SEARCH_USERS: {
      const { users } = action.payload || {}
      const currentUsers = state.contentList.searchUsers ?? []
      const nextUsers = resolveSearchUsers(currentUsers, users, "add")

      return {
        ...state,
        contentList: {
          ...state.contentList,
          searchUsers: nextUsers,
        }
      }
    }

    default:
      return state
  }
}

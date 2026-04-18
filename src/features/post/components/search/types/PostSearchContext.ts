export type PostSearchContext = {
  actions:{
    searchContent: (query:string) => Promise<unknown>
  }
  selector:{
    loading:{
      getSearchFetchingLoading: () => boolean
    }
  }
}
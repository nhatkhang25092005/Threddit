export function initialState(data = {}){
  return{
    saveState:data.initSaveState || false,
    loading:data.loadingState || false,
    count:data.initCount || 0,
    error:null
  }
}

export const postReducer = (state, action)=>{
  switch(action.type){
    case 'START':
      return{
        ...state,
        loading:true
      }
    case 'SUCCESS':
      return{
        error:null,
        loading:false,
        saveState:!state.saveState,
        count: state.count + (state.saveState ? -1 : 1)
      }
    case 'ERROR':
      return{
        ...state,
        loading:false,
        error: action.payload
      }
    case 'SYNC':{
      return{
        ...state,
        saveState:action.payload.saveState,
        count:action.payload.count
      }
    }
    default:{
      console.warn(`${action.type} is not defined!`)
      return state
    }
  }
}
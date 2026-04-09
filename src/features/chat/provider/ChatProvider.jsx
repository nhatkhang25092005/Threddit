import { useMemo, useReducer } from "react";
import { useGetChatRooms, useGetDirectChatRoom } from "../hooks";
import { directChatActions, loadingAction, roomByIdActions } from "../store/actions";
import { reducer, initState } from "../store/reducer";
import {
  createChatSelector,
  createLoadingSelector,
} from "../store/selectors";
import { roomModel } from "../store/models/room.model";
import { ChatContext } from "./context";

export default function ChatProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initState);
  const { getChatRooms, refreshChatRooms } = useGetChatRooms(
    dispatch,
    state.chatRoomHasMore
  );
  const getDirectChatRoom = useGetDirectChatRoom(dispatch);
  const selector = useMemo(
    () => ({
      chat: createChatSelector(state),
      loading: createLoadingSelector(state),
    }),
    [state]
  );

  const actions = useMemo(
    () => ({
      getChatRooms,
      refreshChatRooms,
      getDirectChatRoom,
      upsertRoom: (room) => dispatch(roomByIdActions.addRoom(roomModel(room))),
      updateRoom: (roomId, changes) =>
        dispatch(roomByIdActions.updateRoom(roomId, changes)),
      removeRoom: (roomId) => dispatch(roomByIdActions.removeRoom(roomId)),
      setDirectRoom: (username, roomId) =>
        dispatch(directChatActions.setDirectRoom(username, roomId)),
      removeDirectRoom: (username) =>
        dispatch(directChatActions.removeDirectRoom(username)),
      setRoomLoading: (roomId, isLoading) =>
        dispatch(loadingAction.setRoomLoading(roomId, isLoading)),
    }),
    [getChatRooms, refreshChatRooms, getDirectChatRoom]
  );

  const value = useMemo(
    () => ({
      state,
      actions,
      selector,
    }),
    [state, actions, selector]
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

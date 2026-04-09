import { useCallback } from "react";
import { services } from "../services";
import { combineActions, loadingAction } from "../store/actions";

export function useGetDirectChatRoom(dispatch) {
  const getDirectChatRoom = useCallback(
    async (username) => {
      if (!username) {
        return {
          success: false,
          message: "username is required",
          data: null,
        };
      }

      dispatch(loadingAction.getDirectChatRoomLoading(true));

      try {
        const response = await services.getDirectChatRoom(username);
        if (!response?.success) return response;

        const room = combineActions.getDirectChatRoomSuccess(
          dispatch,
          username,
          response.data
        );

        return {
          ...response,
          data: room,
        };
      } finally {
        dispatch(loadingAction.getDirectChatRoomLoading(false));
      }
    },
    [dispatch]
  );

  return getDirectChatRoom;
}

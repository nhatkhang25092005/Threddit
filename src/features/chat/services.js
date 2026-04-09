import { handleRequest } from "../../api/helper";
import { chatApi } from "../../api/chat/chat.api";

export const chatService = {
  getDirectChatRoom: async (username) =>
    handleRequest(() => chatApi.getDirectChatRoom(username)),

  getChatRooms: async (signal, cursor) =>
    handleRequest(() => chatApi.getChatRooms(signal, cursor)),
};

export const services = chatService;

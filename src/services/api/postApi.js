import axiosClient from "../axiosClient";
const postApi = {
    // Get client post
    getClientPost : (username, cursor) => {
        const url = import.meta.env.VITE_API_POST + `/${username}` + import.meta.env.VITE_API_GET_CLIENT_POST
        const finalUrl = cursor ? `${url}?cursor=${cursor}` : url
        return axiosClient.get(finalUrl)
    },

    //Create post
    createPost: (content, mentionedUser = []) => {
    const url = import.meta.env.VITE_API_POST; 

  // 🔹 Tạo object body ban đầu
  const body = { content };

  // 🔹 Chỉ thêm 'mentionedUser' nếu có phần tử
  if (mentionedUser.length > 0) {
    body.mentionedUser = mentionedUser;
  }

  // 🔹 Gửi request
  return axiosClient.post(url, body);
  },

}

export default postApi
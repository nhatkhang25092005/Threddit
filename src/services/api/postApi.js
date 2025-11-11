import axiosClient from "../axiosClient";
const postApi = {
    // Get client post
    getClientPost : (username, cursor) => {
        const url = import.meta.env.VITE_API_POST + `/${username}` + import.meta.env.VITE_API_GET_CLIENT_POST
        const finalUrl = cursor ? `${url}?cursor=${cursor}` : url
        return axiosClient.get(finalUrl)
    },

 // Lấy danh sách bài viết từ bảng tin chung
  getFeed: () => {
    const url = import.meta.env.VITE_API_POST +"/feed";
    return axiosClient.get(url);
  },

  // Lấy danh sách bài viết từ những người đang theo dõi
  getFollowingFeed: () => {
    const url = import.meta.env.VITE_API_POST + "/following";
    return axiosClient.get(url);
  },

   // Lấy chi tiết 1 bài viết
  getById: (id) => {
    const url = import.meta.env.VITE_API_POST + `/detail/${id}`;
    return axiosClient.get(url);
  },

  // Lấy comment của bài viết
  getComments: (postId) => {
    const url = import.meta.env.VITE_API_POST + `/${postId}/comment`;
    return axiosClient.get(url);
  },

    //Create post
    createPost: (content, mentionedUser = []) => {
    const url = import.meta.env.VITE_API_POST; 

    // Tạo object body ban đầu
    const body = { content };

    // Chỉ thêm 'mentionedUser' nếu có phần tử
    if (mentionedUser.length > 0) {
      body.mentionedUser = mentionedUser;
    }

    // Gửi request
    return axiosClient.post(url, body);
    },

}

export default postApi
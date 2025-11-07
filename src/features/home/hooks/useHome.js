import {useState} from "react"
import convertTime from "../../../utils/convertTime" // dung de set "n thời gian trước"
// convertTime(createAt) (createAt là dữ liệu thô trả về từ api)

/**
 * Xử lý các login của trang home có thể bao gồm:
 * - lấy danh sách các bài viết
 * - bình luận
 * - up/down vote
 * - (mở rộng thêm tùy nhu cầu)
 */
export default function useHome(){
    // Đây là dữ liệu mẫu, thiết kế lại tùy theo response của api
    // Mẫu dưới đang lấy theo thiết kế dữ liệu sẵn trong Home.jsx
    const username = localStorage.getItem("username")
    const templateData = [
        {
            author:username,
            time:"99 giờ",
            content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
          
        },
        {
            author:"Name_User_Cmt",
            time:"99 giờ",
            content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
        },
        {
            author:username,
            time:"99 giờ",
            content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
          
        },
    ].map(item => ({
        ...item,
       isMainPost : item.author === username
    }))
    const [posts, setPosts] = useState(templateData)

    // Logic xu ly o day, mau:
    /**
     * const getPost = useCallback(async()=>{
     *  const response = await handleGetPost(cursorRef)
     *   ...
     * },[])
     */



    return{
        posts
    }
}
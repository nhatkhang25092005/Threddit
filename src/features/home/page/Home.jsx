import * as React from "react";

import PostCard from "../../../components/layout/PostCard";
import {TEXT} from "../../../constant"
import { Box, Typography } from "@mui/material";
import PushPinIcon from "@mui/icons-material/PushPin";
import TrashIcon from "../../../assets/icons/trash.svg?react";
import EditIcon from "../../../assets/icons/pen-edit.svg?react";
import Column from "../../../components/layout/Column";
import useHome from "../../home/hooks/useHome";
import BlockContent from "../../../components/common/BlockContent";

const deleteCommentStyle = {
  "& path": {
    fill: "white !important",
    stroke: "white !important",
  },
  width: 40,
  height: 40,
}

const editCommentStyle = {
  "& path": {
    fill: "white !important",
    stroke: "white !important",
  },
  width: 40,
  height: 40,
}

function getMenuOptions(isMainPost) {
    if (isMainPost) {
      return[{
        label: "Ghim bài viết",
        icon: <PushPinIcon />,
        onClick: () => alert("Ghim bài viết"),
      }]
    }
    else return [
    {
      label: "Xóa bình luận",
      icon: <Box component={TrashIcon} sx={deleteCommentStyle} />,
      onClick: () => alert("Xóa bình luận")
    },
    {
      label: "Sửa bình luận",
      icon: <Box component={EditIcon} sx={editCommentStyle} />,
      onClick: () => alert("Sửa bình luận")
    }
  ];
}

export default function DetailPost() {
  const {
    posts
  } = useHome();
  return (
    <>
      <Column customStyle={{ pt: "1rem" }}>
        <Typography variant="title">Threddit </Typography>
  
          <Box
            sx={{
              width: "70%",
              mx: "auto",
              border: "1px solid #ffffffff",
              borderRadius: "12px",
              overflow: "hidden",
              px:"1rem",
              mt:"3rem"
            }}
          > 


          {/* 
          - Tùy chỉnh lại hàm getMenuOptions cho phù hợp
          - Thay dữ liệu mẫu bằng dữ liệu thực từ API 
           */}
            {posts.length >=0 
            ? posts.map((post, index) => (
                <PostCard
                  key={index}
                  author={post.author}
                  time={post.time}
                  content={post.content}
                  isMainPost = {post.isMainPost}
                  style={{ borderRadius: "12px" }}
                  menuOptions={getMenuOptions(post.isMainPost)}
                  />
                ))
            :
            // Thông báo nếu chưa có bài viết nào
              <BlockContent><Typography variant="sub" align="center" sx={{textAlign:"center"}}>{TEXT.NO_POST}</Typography></BlockContent>
            }
          </Box>
      </Column>
    </>
  );
}

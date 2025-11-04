import * as React from "react";

import PostCard from "../../../components/layout/PostCard";
import TopBar from "../../../components/layout/TopBar";
import { Box } from "@mui/material";
import PushPinIcon from "@mui/icons-material/PushPin";
import TrashIcon from "../../../assets/icons/trash.svg?react"
import EditIcon from "../../../assets/icons/pen-edit.svg?react"

export default function DetailPost() {
  return (
    <>
      <TopBar title="Threaddits" onLogin={() => alert("Login")} />

      <div
        style={{
          marginLeft: "120px",
          marginTop: "80px",
          paddingBottom: "40px",
        }}
      >

    
         <Box
    sx={{
      width: "70%",
      mx: "auto",
      border: "1px solid #ffffffff",
      borderRadius: "12px",
      overflow: "hidden", 
    }}
  >
          <PostCard
            author="Name_User"
            time="99 giờ"
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..."
            menuOptions={[
                { label: "Ghim bài viết", icon: <PushPinIcon />, onClick: () => alert("Ghim bài viết") },
               ]}
            isMainPost
            style = {{ borderRadius: "12px", }}
          />

          <PostCard
  author="Name_User_Cmt"
  time="99 giờ"
  content="Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
  menuOptions={[
    {
      label: "Xóa bình luận",
      icon: (
        <Box
          component={TrashIcon}
          sx={{
            "& path": {
              fill: "white !important",
              stroke: "white !important",
            },
            width: 40,
            height: 40,
          }}
        />
      ),
      onClick: () => alert("Xóa bình luận"),
    },
    {
      label: "Sửa bình luận",
      icon: (
        <Box
          component={EditIcon}
          sx={{
            "& path": {
              fill: "white !important",
              stroke: "white !important",
            },
            width: 40,
            height: 40,
          }}
        />
      ),
      onClick: () => alert("Sửa bình luận"),
    },
  ]}
  style={{
    borderRadius: "12px",
  }}
/>

          <PostCard
            author="Name_User_Cmt"
            time="99 giờ"
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..."
            menuOptions={[
                { label: "Ghim bài viết", icon: <PushPinIcon />, onClick: () => alert("Ghim bài viết") },
               ]}
            style = {{ borderRadius: "12px", }}
          />
          </Box>
     
      </div>
    </>
  );
}

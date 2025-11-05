import * as React from "react";

import PostCard from "../../../components/layout/PostCard";
import TopBar from "../../../components/layout/TopBar";
import TabMenu from "../../../components/layout/TabMenu";
import { Box } from "@mui/material";
import PushPinIcon from "@mui/icons-material/PushPin";

export default function Home() {
  const [tab, setTab] = React.useState("posts");

  return (
    <>
      <TopBar title="Trang chủ" onLogin={() => alert("Login")} />

      <div
        style={{
          marginLeft: "120px",
          marginTop: "80px",
          paddingBottom: "40px",
        }}
      >
        <TabMenu
          tabs={[
            { label: "Xu hướng", value: "posts" },
            { label: "Đang theo dõi", value: "profile" },
          ]}
          value={tab}
          onChange={setTab}
        />

        {tab === "posts" && (
         <Box
    sx={{
      width: "80%",
      mx: "auto",
      border: "1px solid #A6A6A6",
      borderTop: "none",
      borderRadius: "0 0 12px 12px",
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
            style = {{ borderRadius: "12px", }}
          />
          <PostCard
            author="Name_User"
            time="99 giờ"
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..."
            menuOptions={[
                { label: "Ghim bài viết", icon: <PushPinIcon />, onClick: () => alert("Ghim bài viết") },
               ]}
            style = {{ borderRadius: "12px", }}
          />
          <PostCard
            author="Name_User"
            time="99 giờ"
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..."
            menuOptions={[
                { label: "Ghim bài viết", icon: <PushPinIcon />, onClick: () => alert("Ghim bài viết") },
               ]}
            style = {{ borderRadius: "12px", }}
          />
          <PostCard
            author="Name_User"
            time="99 giờ"
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..."
            menuOptions={[
                { label: "Ghim bài viết", icon: <PushPinIcon />, onClick: () => alert("Ghim bài viết") },
               ]}
            style = {{ borderRadius: "12px", }}
          />
          </Box>
        )}

        {tab === "profile" && (
             <Box
    sx={{
      width: "80%",
      mx: "auto",
      border: "1px solid #A6A6A6",
      borderTop: "none",
      borderRadius: "0 0 12px 12px",
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
            style = {{ borderRadius: "12px", }}
          />
          <PostCard
            author="Name_User"
            time="99 giờ"
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..."
            menuOptions={[
                { label: "Ghim bài viết", icon: <PushPinIcon />, onClick: () => alert("Ghim bài viết") },
               ]}
            style = {{ borderRadius: "12px", }}
          />
          <PostCard
            author="Name_User"
            time="99 giờ"
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..."
            menuOptions={[
                { label: "Ghim bài viết", icon: <PushPinIcon />, onClick: () => alert("Ghim bài viết") },
               ]}
            style = {{ borderRadius: "12px", }}
          />
          <PostCard
            author="Name_User"
            time="99 giờ"
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..."
            menuOptions={[
                { label: "Ghim bài viết", icon: <PushPinIcon />, onClick: () => alert("Ghim bài viết") },
               ]}
            style = {{ borderRadius: "12px", }}
          />
          </Box>
        )}
      </div>
    </>
  );
}

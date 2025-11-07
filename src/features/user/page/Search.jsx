import React, { useState } from "react";
import PostCard from "../../../components/layout/PostCard";
import TopBar from "../../../components/layout/TopBar";
import TabMenu from "../../../components/layout/TabMenu";
import SearchBar from "../../../components/layout/SearchBar";
import UserFollowCard from "../../../components/layout/UserFollowCard";
import PushPinIcon from "@mui/icons-material/PushPin";
import { Box } from "@mui/material";

export default function App() {
  const [tab, setTab] = React.useState("posts");
  const [query, setQuery] = useState("");
  return (
    <>
      <TopBar title="Tìm kiếm" onLogin={() => alert("Login")} />

      <Box
        sx={{
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#1a1a1a",
          color: "white",
          borderRadius: "12px",
          p: 2,
          border: "1px solid #A6A6A6",
          boxShadow: "0 0 10px rgba(0,0,0,0.4)",
          width: "85%",
          marginLeft: "120px",
          marginTop: "80px",
          paddingBottom: "18px",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <SearchBar
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm kiếm"
            sx={{ width: "80%" }} // chỉnh chiều rộng thanh tìm kiếm
          />
        </Box>

        <TabMenu
          tabs={[
            { label: "Bài viết", value: "posts" },
            { label: "Cá nhân", value: "profile" },
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
                {
                  label: "Ghim bài viết",
                  icon: <PushPinIcon />,
                  onClick: () => alert("Ghim bài viết"),
                },
              ]}
              style={{ borderRadius: "12px" }}
            />
            <PostCard
              author="Name_User"
              time="99 giờ"
              content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..."
              menuOptions={[
                {
                  label: "Ghim bài viết",
                  icon: <PushPinIcon />,
                  onClick: () => alert("Ghim bài viết"),
                },
              ]}
              style={{ borderRadius: "12px" }}
            />
            <PostCard
              author="Name_User"
              time="99 giờ"
              content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..."
              menuOptions={[
                {
                  label: "Ghim bài viết",
                  icon: <PushPinIcon />,
                  onClick: () => alert("Ghim bài viết"),
                },
              ]}
              style={{ borderRadius: "12px" }}
            />
            <PostCard
              author="Name_User"
              time="99 giờ"
              content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..."
              menuOptions={[
                {
                  label: "Ghim bài viết",
                  icon: <PushPinIcon />,
                  onClick: () => alert("Ghim bài viết"),
                },
              ]}
              style={{ borderRadius: "12px" }}
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
            <UserFollowCard
              name="Name_User"
              onFollow={() => alert("Theo dõi 1")}
            />
            <UserFollowCard
              name="Name_User"
              onFollow={() => alert("Theo dõi 2")}
            />
            <UserFollowCard
              name="Name_User"
              onFollow={() => alert("Theo dõi 3")}
            />
            <UserFollowCard
              name="Name_User"
              onFollow={() => alert("Theo dõi 4")}
            />
          </Box>
        )}
      </Box>
    </>
  );
}

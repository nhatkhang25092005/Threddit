import * as React from "react";
import { Box, Typography } from "@mui/material";
import SideBar from "../src/components/layout/Sidebar";
import PostCard from "../src/components/layout/PostCard";
import TopBar from "../src/components/layout/TopBar";
import TabMenu from "../src/components/layout/TabMenu";
import MenuOption from "./components/layout/MenuOption";

export default function App() {
  const [page, setPage] = React.useState("home");
  const [tab, setTab] = React.useState("posts");

  return (
    <>
      <SideBar value={page} onChange={setPage} />
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
          <PostCard
            author="Name_User"
            time="99 giờ"
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..."
            style = {{ borderRadius: "0 0 12px 12px", }}
          />
        )}

        {tab === "profile" && (
          <div style={{ color: "white", textAlign: "center", marginTop: "40px" }}>
            <MenuOption>Thêm </MenuOption>
          </div>
        )}
      </div>
    </>
  );
}

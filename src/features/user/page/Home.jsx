import * as React from "react";

import PostCard from "../../../components/layout/PostCard";
import TopBar from "../../../components/layout/TopBar";
import TabMenu from "../../../components/layout/TabMenu";
import { Box, CircularProgress,Typography } from "@mui/material";
import PushPinIcon from "@mui/icons-material/PushPin";
import postApi from "../../../services/api/postApi";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [tab, setTab] = React.useState("feed");
  const [posts, setPosts] = React.useState([]);
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();

React.useEffect(() => {
  const fetchPosts = async () => {
    setLoading(true);
    setError("");

    try {
      let res;
      if (tab === "feed") res = await postApi.getFeed(); 
      else if (tab === "following") res = await postApi.getFollowingFeed(); // /api/post/following

      const result = res?.data?.data;

      if (tab === "following" && Array.isArray(result?.posts)) {
        setPosts(result.posts);
      } else if (tab === "feed" && Array.isArray(result)) {
        setPosts(result);
      } else {
        console.warn("⚠️ Dữ liệu không hợp lệ:", result);
        setPosts([]);
      }
    } catch (err) {
      console.error("Lỗi khi tải bài viết:", err);
      setError("Không thể tải bài viết. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  fetchPosts();
}, [tab]);


  
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
            { label: "Xu hướng", value: "feed" },
            { label: "Đang theo dõi", value: "following" },
          ]}
          value={tab}
          onChange={setTab}
        />

        
         <Box
    sx={{
      width: "80%",
      mx: "auto",
      border: "1px solid #A6A6A6",
      borderTop: "none",
      borderRadius: "0 0 12px 12px",
      overflow: "hidden", 
    }}
  > {/* Loading */}
          {loading && (
            <Box sx={{ textAlign: "center", py: 5 }}>
              <CircularProgress color="inherit" />
              <Typography sx={{ mt: 2 }}>Đang tải bài viết...</Typography>
            </Box>
          )}

          {/* Lỗi */}
          {!loading && error && (
            <Typography color="error" sx={{ textAlign: "center", py: 4 }}>
              {error}
            </Typography>
          )}

          {/* Không có bài viết */}
          {!loading && !error && posts.length === 0 && (
            <Typography sx={{ textAlign: "center", py: 4, color: "#aaa" }}>
              Chưa có bài viết nào để hiển thị.
            </Typography>
          )}

          
          {/* Danh sách bài viết */}
          {!loading &&
            !error &&
            posts.map((post) => (
                <PostCard
                  key={post.id}
                  author={post.author?.username || "Ẩn danh"}
                  time={new Date(post.createdAt).toLocaleString("vi-VN")}
                  content={post.content}
                  menuOptions={[
                    {
                      label: "Ghim bài viết",
                      icon: <PushPinIcon />,
                      onClick: () => alert("Đã ghim!"),
                    },
                  ]}
                  onClick={() => navigate(`/app/post/detail/${post.id}`)} // ✅ nhấn vào sẽ sang trang chi tiết
                />
              ))}
            </Box>
      </div>
    </>
  );
}

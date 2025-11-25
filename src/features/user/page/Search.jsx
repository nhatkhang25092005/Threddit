import React, { useState } from "react";
import Post from "../../../components/common/Post";
import TopBar from "../../../components/layout/TopBar";
import TabMenu from "../../../components/layout/TabMenu";
import SearchBar from "../../../components/layout/SearchBar";
import UserFollowCard from "../../../components/layout/UserFollowCard";
import { Box, CircularProgress, Typography, Button } from "@mui/material";
import postApi from "../../../services/api/postApi";
import followApi from "../../../services/api/followApi";
import {useLocation } from "react-router-dom";
import convertTime from "../../../utils/convertTime";

export default function App() {
  const [tab, setTab] = useState("posts");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const location = useLocation(); // Thêm useLocation

  const currentUserId = null; // Thay bằng user ID thật

  // Hàm tìm kiếm chính
  const handleSearch = async () => {
    if (!query.trim()) return;
    setSearched(true);
    setLoading(true);
    setError("");

    try {
      let res;
      if (tab === "posts") {
        res = await postApi.searchPosts(query);
        const posts = res.data?.data?.posts || [];
        setResults(posts);
      } else if (tab === "profile") {
        res = await followApi.searchUsers(query);
        const users = res.data?.data?.users || [];
        setResults(users);
      }
    } catch (err) {
      console.error("Lỗi tìm kiếm:", err);
      setError("Không thể tìm kiếm. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  // Khi chuyển tab, tự động tìm lại theo từ khóa
  React.useEffect(() => {
    if (searched && query.trim()) handleSearch();
  }, [tab]);

  // Xử lý Theo dõi / Hủy theo dõi
  const handleFollowToggle = async (username, canFollow) => {
    try {
      if (canFollow) {
        await followApi.followClient(username);
      } else {
        await followApi.unfollowClient(username); // Sửa khoảng trắng
      }

      // Cập nhật lại danh sách user
      setResults((prev) =>
        prev.map((u) =>
          u.username === username ? { ...u, canFollow: !canFollow } : u
        )
      );
    } catch (err) {
      alert("Lỗi khi thực hiện thao tác. Vui lòng thử lại.");
      console.error(err);
    }
  };

  // Xử lý khi post bị xóa
  const handlePostDeleted = (postId) => {
    setResults((prev) => prev.filter((p) => p.id !== postId));
  };

  return (
    <>
      <TopBar title="Tìm kiếm" onLogin={() => alert("Login")} />

      <Box
        sx={{
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          borderRadius: "12px",
          p: 2,
          boxShadow: "0 0 10px rgba(0,0,0,0.4)",
          width: "85%",
          marginLeft: "120px",
          marginTop: "80px",
          paddingBottom: "18px",
        }}
      >
        {/* THANH SEARCH */}
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <SearchBar
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Nhập từ khóa..."
            sx={{ width: "80%" }}
          />
          <Button
            variant="contained"
            sx={{ ml: 2, fontWeight: "bold" }}
            onClick={handleSearch}
          >
            Tìm kiếm
          </Button>
        </Box>

        {/* Chỉ hiển thị tab và kết quả sau khi bấm tìm */}
        {searched && (
          <>
            <TabMenu
              tabs={[
                { label: "Bài viết", value: "posts" },
                { label: "Cá nhân", value: "profile" },
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
            >
              {/* LOADING */}
              {loading && (
                <Box sx={{ textAlign: "center", py: 5 }}>
                  <CircularProgress color="inherit" />
                  <Typography sx={{ mt: 2 }}>Đang tìm kiếm...</Typography>
                </Box>
              )}

              {/* LỖI */}
              {!loading && error && (
                <Typography color="error" sx={{ textAlign: "center", py: 4 }}>
                  {error}
                </Typography>
              )}

              {/* KẾT QUẢ BÀI VIẾT */}
              {!loading && !error && tab === "posts" && results.length > 0 &&
                results.map((post, index) => (
                  <Post
                    key={post.id}
                    item={{
                            ...post,
                            createdAt: convertTime(post.createdAt) // Convert trước khi truyền
                          }}
                    index={index} // Lấy từ map
                    createdPostsLength={results.length} // Dùng results.length
                    isOwner={post.author?.id === currentUserId}
                    location={location.pathname}
                    onNavigate={true}
                    showPin={false} //  Không hiển thị pin trong search
                    onResult={(result) => {
                      console.log(result);
                    }}
                    onPostUpdatedRendering={(data) => {
                      if (data.type === "delete") {
                        handlePostDeleted(data.postId); // Gọi hàm xử lý
                      }
                    }}
                    sx={{ borderRadius: "12px" }}
                  />
                ))}

              {/* KẾT QUẢ CÁ NHÂN */}
              {!loading && !error && tab === "profile" && results.length > 0 &&
                results.map((user) => (
                  <UserFollowCard
                    key={user.id}
                    name={user.username}
                    hideButton={user.canFollow === null}
                    buttonText={
                      user.canFollow === null
                        ? ""
                        : user.canFollow
                        ? "Theo dõi"
                        : "Đã theo dõi"
                    }
                    disabled={user.canFollow === null}
                    onFollow={() =>
                      user.canFollow !== null &&
                      handleFollowToggle(user.username, user.canFollow)
                    }
                  />
                ))}

              {/* KHÔNG CÓ KẾT QUẢ */}
              {!loading && !error && results.length === 0 && (
                <Typography sx={{ textAlign: "center", py: 4, color: "#aaa" }}>
                  Không tìm thấy kết quả nào.
                </Typography>
              )}
            </Box>
          </>
        )}
      </Box>
    </>
  );
}
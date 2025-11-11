import * as React from "react";
import { useParams } from "react-router-dom";
import PostCard from "../../../components/layout/PostCard";
import TopBar from "../../../components/layout/TopBar";
import { Box, CircularProgress, Typography } from "@mui/material";
import PushPinIcon from "@mui/icons-material/PushPin";
import TrashIcon from "../../../assets/icons/trash.svg?react"
import EditIcon from "../../../assets/icons/pen-edit.svg?react"
import postApi from "../../../services/api/postApi";

export default function DetailPost() {
  const { id } = useParams();
  const [comments, setComments] = React.useState([]);
  const [post, setPost] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      setError("");

      try {
        const [postRes, commentRes] = await Promise.all([
          postApi.getById(id),
          postApi.getComments(id),
        ]);

        const postData = postRes?.data?.data?.result || postRes?.data?.data;
        const commentData = commentRes?.data?.data?.comments || [];

        setPost(postData);
        setComments(commentData);
      } catch (err) {
        console.error("❌ Lỗi tải chi tiết bài viết:", err);
        setError("Không thể tải chi tiết bài viết.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  if (loading)
    return (
      <Box sx={{ textAlign: "center", mt: 10 }}>
        <CircularProgress />
        <Typography>Đang tải bài viết...</Typography>
      </Box>
    );

  if (!post)
    return (
      <Typography sx={{ textAlign: "center", mt: 10 }}>
        Không tìm thấy bài viết.
      </Typography>
    );
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
                    {/* Bài viết chính */}
          <PostCard
            author={post.author?.username || "Ẩn danh"}
            time={new Date(post.createdAt).toLocaleString("vi-VN")}
            content={post.content}
            isMainPost
            menuOptions={[
              {
                label: "Ghim bài viết",
                icon: <PushPinIcon />,
                onClick: () => alert("Ghim bài viết"),
              },
            ]}
          />

          {/* === DANH SÁCH BÌNH LUẬN === */}
          {comments.length === 0 && (
            <Typography sx={{ textAlign: "center", py: 3, color: "#aaa" }}>
              Chưa có bình luận nào.
            </Typography>
          )}

          {comments.map((cmt) => (
            <PostCard
              key={cmt.id}
              author={cmt.commenter?.username || "Ẩn danh"}
              time={new Date(cmt.createdAt).toLocaleString("vi-VN")}
              content={cmt.content}
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
          ))}
        </Box>
      </div>
    </>
  );
}
import { useState,useEffect } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import postApi from "../../../services/api/postApi";
import useProfile from "../hooks/useProfile";

export default function CreatePost({ onPost, onExit }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const { userInfo, getUserInfo } = useProfile();


  useEffect(() => {
getUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePost = async () => {
    if (content.trim() === "") return alert("Vui lòng nhập nội dung trước khi đăng!");

     //  Tách các từ bắt đầu bằng @ 
  const mentionMatches = content.match(/@(\w+)/g); 

  //  Lọc bỏ ký tự @
  const mentionedUser = mentionMatches ? mentionMatches.map(m => m.substring(1)) : [];

    setLoading(true);
    try {
      const res = await postApi.createPost(content, mentionedUser);
      alert("Đăng bài thành công!");
      setContent("");

      if (onPost) onPost(res); // callback để reload danh sách bài viết
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
<>
    {/* <TopBar title="Tìm kiếm" onLogin={() => alert("Login")} /> */}
    <Box
      sx={{
        backgroundColor: "#1a1a1a",
        color: "white",
        borderRadius: "12px",
        border: "1px solid #ffffffff",
        width: "50%",
        mx: "auto",
        mt: 3,
        boxShadow: "0 0 10px rgba(0,0,0,0.4)",
        marginTop: "100px",
      }}
    >
      {/* === Thanh tab đầu === */}
      <Box
        sx={{
          display: "flex",
          height: "55px",
          alignItems: "center",
          borderBottom: "1px solid #ffffffff",
          borderRadius: "12px 12px 0 0",
          overflow: "hidden",
        }}
      >
        <Box
          onClick={onExit}
          sx={{
            width: "7%",
            textAlign: "left",
            py: 1,
            cursor: "pointer",
            "&:hover": { backgroundColor: "#2b2b2b" },
          }}
        >
          <Typography sx={{ fontWeight: "boldbold", pl:"7px" }}>Thoát</Typography>
        </Box>

        <Box
          sx={{
            flex: 1,
            textAlign: "center",
            py: 1,
            pr: "7%",
            backgroundColor: "#1e1e1e",
          }}
        >
          <Typography sx={{ fontWeight: "bold", color: "#fff" }}>
            Threaddit mới
          </Typography>
        </Box>
      </Box>

      {/* === Nội dung đăng bài === */}
      <Box sx={{ p: 2 }}>
        <Typography sx={{ fontWeight: "bold", color:"#fff" }}>{userInfo?.username}</Typography>
        <TextField
          multiline
          fullWidth
          placeholder="Tin gì mới?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          variant="standard"
          InputProps={{
            disableUnderline: true,
            sx: {
              color: "#fff",
              borderRadius: "8px",
              p: 1.5,
              mt: 1,
              fontSize: "0.95rem",
            },
          }}
        />

        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Button
            variant="contained"
            onClick={handlePost}
            sx={{
              backgroundColor: "#fff",
              color: "#000",
              fontWeight: "bold",
              borderRadius: "8px",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#e5e5e5",
              },
            }}
          >
            {loading ? "Đang đăng..." : "Đăng bài"}
          </Button>
        </Box>
      </Box>
    </Box>
    </>
  );
}

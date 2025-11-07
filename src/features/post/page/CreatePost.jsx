import { Box, Typography, TextField, Button } from "@mui/material";
import useCreatePost from "../hooks/useCreatePost";
import { useEffect, useState } from "react";
import PopupNotification from "../../../components/common/PopupNotification";
import { DISPLAY } from "../../../constant";
import BlockContent from "../../../components/common/BlockContent";
import Column from "../../../components/layout/Column";
const username = localStorage.getItem("username");
export default function CreatePost({ onPost, onExit }) {
  const { result, content, setContent, loading, handlePost } = useCreatePost();
  console.log(result);

  // popup modal controller
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (result?.type === DISPLAY.POPUP) setOpen(true);
  }, [result]);

  return (
    <>
      <PopupNotification
        open={open}
        onClose={() => setOpen(false)}
        title={result?.title}
        content={result?.message}
      />
      {/* <TopBar title="Tìm kiếm" onLogin={() => alert("Login")} /> */}
      <Column customStyle={{ pt: "7rem" }}>
        <BlockContent
          customStyle={{ width: "65%", border:"solid #A6A6A6 1px", borderRadius:"8px", }}
          header={
            <Box
              onClick={onExit}
              sx={{
                width:"100%",
                display: "flex",
                justifyItems:"center",
                flexDirection: "row",
                position:"relative",
                textAlign: "left",
                py: 2,
                borderBottom:"solid #A6A6A6 1px",
              }}
            >
              <Typography sx={{ 
                  fontWeight: "bold", 
                  position:"absolute",
                  width:"fit-content", 
                  cursor:"pointer",
                  pl:"1rem",
                  "&:hover":{textDecoration:"underline"}
                  }}>
                Thoát
              </Typography>
              <Typography variant="sub" sx={{ fontWeight: "bold", color: "#fff", mx: "auto" }}>
                Threddit mới
              </Typography>
            </Box>
          }
        >
          {/* === Nội dung đăng bài === */}
          <Box sx={{ p: 2 }}>
            <Typography sx={{ fontWeight: "bold", color: "#fff" }}>
              {username}
            </Typography>
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
                variant={!content.trim() === "" ? "contained" : "darker"}
                disabled={content.trim() === "" || loading}
                onClick={() => handlePost(onPost)}
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
        </BlockContent>
      </Column>
    </>
  );
}

import { Box } from "@mui/material";

export default function PostMedia({ sx, src, type }) {
  if (!src || !type) return null;

  if (type.startsWith("image/")) {
    return <Box component="img" src={src} alt="Post media" sx={sx.media} />;
  }

  if (type.startsWith("video/")) {
    return <Box component="video" src={src} controls sx={sx.media} />;
  }

  if (type.startsWith("audio/")) {
    return <Box component="audio" src={src} controls sx={sx.audioMedia} />;
  }

  return null;
}

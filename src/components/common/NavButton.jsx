import Row from "../layout/Row";
import { Typography, Button } from "@mui/material";
import { replace, useNavigate } from "react-router-dom";
export default function NavButton({ subTitle, btnText, destination }) {
  const navigate = useNavigate();
  return (
    <Row config={{ top: "1rem", right: "1rem", position: "absolute",zIndex:10 }}>
      <Typography variant="sub">{subTitle}</Typography>
      <Button
        variant="contained"
        sx={{ height: "40px" }}
        onClick={() => navigate(destination, replace)}
      >
        {btnText}
      </Button>
    </Row>
  );
}

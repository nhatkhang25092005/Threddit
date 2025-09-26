import { Typography, Box, Button } from "@mui/material";
import InputField from "../components/InputField";
import Column from "../../../components/layout/Column";
import Row from "../../../components/layout/Row";
export default function Login() {
  return (
    <>
      <Row config={{top:"1rem",right:"1rem",position:"absolute"}}>
        <Typography variant="sub"> Bạn chưa có tài khoản?</Typography>
        <Button variant="contained" sx={{height:"40px"}}>Đăng kí</Button>
      </Row>
      <Column>
        <Typography variant="title">Đăng nhập vào Threddit</Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2.5,
            width: "30vw",
            pt: "1rem",
          }}
        >
          <InputField type={"email"} label={"email"} isRequired={true} />
          <InputField type={"password"} label={"password"} isRequired={true} />
          <Button variant="contained">Đăng nhập</Button>
          <Button variant="text" disableRipple>Quên mật khẩu</Button>
        </Box>
      </Column>
    </>
  );
}

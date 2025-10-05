import { Button, Typography } from "@mui/material";
import useProfile from "../hooks/useProfile";
export default function Profile() {
  const {signout} = useProfile()
  return (
    <>

      <Typography variant="title">This is profile =)</Typography>
      <Button variant="contained" onClick={signout}>Click to signout (Test)</Button>
    </>
  );
}

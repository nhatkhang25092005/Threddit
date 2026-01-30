import Surface from "../../../components/common/Surface";
import UserCard from "../../../components/common/UserCard";
import { Grid, Box } from "@mui/material";
import FollowProvider from "../provider/FollowProvider";

export default function FollowerList(){
  return(
    <Surface sx={{}}>
      <Grid container spacing={2} width={'100%'}>
        {Array.from({ length: 10 }).map((_, index) => (
          <Grid item xs={6} key={index} sx={{display:'flex', width:'49%', }}>
            <UserCard />
          </Grid>
        ))}
      </Grid>
    </Surface>
  )
}


import { Box, Button, Typography } from "@mui/material";
import useProfile from "../hooks/useProfile";
import DisplayField from "../components/DisplayField";
import { LABEL, TITLE } from "../../../constant";
import { useEffect, useState} from "react";

export default function Profile() {
  const { getUserInfo, saveChange, userInfo } = useProfile();
  const [editName, setEditName] = useState("")

  // call to get user info at the first rendering
  useEffect(()=>{getUserInfo()},[])

  // create a copy of username, which user can edit
  useEffect(()=>{if(userInfo?.username) setEditName(userInfo.username)},[userInfo])

  // handle change of username input field
  function handleChange(e){ setEditName(e.target.value) }
  return (
    <>
      <Box
        sx={{
          mt:"6rem",
          display: "flex",
          flexDirection: "column",
          width: "50%",
          height: "fit-content",
          alignItems: "start",
          mx: "auto",
        }}
      >
        <Typography variant="title" ml={2}>{TITLE.USER_INFO}</Typography>
        <Box
          border={"solid #A6A6A6 1px"}
          component={"div"}
          sx={{
            width: "100%",
            mx: "auto",
            my: "auto",
            height: "fit-content",
            borderRadius: "20px",
            p: "3rem",
            display: "flex",
            flexDirection: "column",
            gap:"2rem"
          }}
        >
          {/* username */}
          <Box
            display="flex"
            flexDirection={"row"}
            sx={{
              height: "fit-content",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <Typography width={"40%"} textAlign={"start"}>
              {LABEL.USERNAME}
            </Typography>
            <DisplayField
              name={"username"}
              value={editName}
              onKeyDown={(e)=>{if(e.key === "Enter"){saveChange(userInfo.username, editName)}}} 
              onChange={(e)=>handleChange(e)}
              sx={{ fontSize: "17px" }}
            />
          </Box>

          {/* email */}
          <Box
            display="flex"
            flexDirection={"row"}
            sx={{
              height: "fit-content",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <Typography width={"40%"} textAlign={"start"}>
              {LABEL.EMAIL}
            </Typography>
            <DisplayField
              allowFocus = {false}
              name={"username"}
              value={userInfo?.email}
              sx={{
                fontSize: "17px",
                disabled: "true",
                color: "#BCBDBF",
                pointerEvents: "false",
                cursor: "default",
                readonly: "true",
                caretColor: "transparent",
              }}
            />
          </Box>
          <Button onClick={()=>saveChange(userInfo.username, editName)} variant="contained" sx={{width:"50%", mx:"auto"}}>{LABEL.SAVE}</Button>
        </Box>
      </Box>
    </>
  );
}

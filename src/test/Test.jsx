import { useState } from "react";
import Post from "../components/common/Post";
import DetailPost from "../features/post/page/PostDetail";
import {Button} from "@mui/material"
const data1 =  
    {
        "id": 39,
        "author": {
          "id": "6bdee0ed-eda7-40f5-8d64-1fd245f6ad77",
          "email": "nhatkhang25092005@gmail.com",
          "username": "Zesk2509"
        },
        "content": "ne.",
        "isPinned": false,
        "createdAt": "2025-10-26T03:07:44.661Z",
        "updatedAt": "2025-11-11T00:25:29.711Z",
        "mentionedUser": [],
        "isUpvote": null,
        "isSave": true,
        "commentNumber": 0,
        "saveNumber": 4,
        "upvoteNumber": 2,
        "downvoteNumber": 2
      }
const data2 = {
        "id": 37,
        "author": {
          "id": "6bdee0ed-eda7-40f5-8d64-1fd245f6ad77",
          "email": "nhatkhang25092005@gmail.com",
          "username": "Zesk2509"
        },
        "content": "Ngủ trưa là nghệ thuật, mà tôi là nghệ sĩ chân chính.",
        "isPinned": false,
        "createdAt": "2025-10-26T03:07:44.661Z",
        "updatedAt": "2025-11-11T00:29:29.936Z",
        "mentionedUser": [],
        "isUpvote": null,
        "isSave": false,
        "commentNumber": 0,
        "saveNumber": 3,
        "upvoteNumber": 2,
        "downvoteNumber": 2
      }
function handleUpdateRendering(update){
    console.log(update)
}
 
function handleResult(result){
    console.log("Result test", result)
}

export default function Test(){
  const [open, setOpen] = useState(false)

    return (<>
        {/* <Post
            onResult={handleResult}
            sx={{width:"50%", mx:"auto",mt:"4rem"}}
            item={data1}
            index={1}
            createdPostsLength={1}
            isOwner = {true}
            onPostUpdatedRendering = {handleUpdateRendering}
        />
         */}
        <Button onClick={()=>setOpen(prev=>!prev)}>Open</Button>
        <DetailPost onOpen={open} onClose={()=>setOpen(false)} post={data1}/>
    </>)
}
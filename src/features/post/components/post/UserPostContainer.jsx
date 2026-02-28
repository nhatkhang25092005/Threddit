import TabsController from '../../../../components/layout/TabsController'
import useAuth from '../../../../core/auth/useAuth'
import PostList from './PostList'
export default function UserPostContainer(){
  const {isOwner} = useAuth()
  if(isOwner)
    return(
      <TabsController sx={{width:"100%", mt:'1rem', py:0}}>
        <PostList variant='userPost' label = 'Bài viết'/>
        {/* <PostList label = 'Bài viết đã lưu'/> */}
      </TabsController>
    )

  else return <PostList/>
}
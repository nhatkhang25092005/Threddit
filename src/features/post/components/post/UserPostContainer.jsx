import TabsController from "../../../../components/layout/TabsController";
import { composerText } from "../../../../constant/text/vi/post/composer.text";
import useAuth from "../../../../core/auth/useAuth";
import PostList from "./PostList";

export default function UserPostContainer() {
  const { isOwner } = useAuth();

  if (isOwner) {
    return (
      <TabsController sx={{ width: "100%", mt: "1rem", py: 0, mb: "1rem" }}>
        <PostList variant="userPost" label={composerText.tabs.userPosts} />
        <PostList variant="savedPost" label={composerText.tabs.savedPosts} />
      </TabsController>
    );
  }

  return <PostList />;
}

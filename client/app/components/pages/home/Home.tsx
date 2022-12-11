import { useAuth } from "../../../hooks/useAuth";
import { postApi } from "../../../store/api/post-api";
import { userApi } from "../../../store/api/user-api";
import SidebarWithHeader from "../../layout/SidebarWithHeader";
import PostCreator from "../../ui/posts/PostCreator";
import PostList from "../../ui/posts/PostList";
import HeadTag from "../HeadTag";

const Home = () => {
  const currentUserId = useAuth().user?.id;
  const { data: posts } = postApi.useGetRelatedPostsQuery(null);
  const { data: user } = userApi.useGetUserDataQuery(currentUserId);

  return (
    <SidebarWithHeader>
      <HeadTag title={"Новости"} />
      <PostCreator user={user} />
      <PostList posts={posts} />
    </SidebarWithHeader>
  );
};

export default Home;

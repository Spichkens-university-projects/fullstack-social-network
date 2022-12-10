import { GetStaticPaths, GetStaticProps } from "next";
import Profile from "../../app/components/pages/profile/Profile";

import { IFriend } from "../../app/components/types/friend.interface";
import { IPost } from "../../app/components/types/post.interface";
import { IUser } from "../../app/components/types/user.interface";
import { PrivateNextPage } from "../../app/providers/private-route.interface";
import { FriendsService } from "../../app/services/friends.service";
import { PostService } from "../../app/services/post.service";
import { UserService } from "../../app/services/user.service";

interface Props {
  user: IUser;
  friends: IFriend[];
  posts: IPost[];
}

const ProfilePage: PrivateNextPage<Props> = ({ user, friends, posts }) => {
  return <Profile user={user} friends={friends} posts={posts} />;
};

ProfilePage.isPrivatePage = true;

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const users = await UserService.getAllUsers();
    const paths = users.map((user) => ({
      params: {
        id: String(user.id),
      },
    }));

    return {
      paths,
      fallback: "blocking",
    };
  } catch (e) {
    return {
      paths: [],
      fallback: false,
    };
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const user = await UserService.getUserById(Number(params?.id));
  const friends = await FriendsService.getAllFriends(Number(params?.id));
  const posts = await PostService.getPostsOfUser(Number(params?.id));

  if (!user)
    return {
      redirect: {
        permanent: false,
        destination: "/error",
      },
    };
  return {
    props: {
      user,
      friends,
      posts,
    },
  };
};

export default ProfilePage;

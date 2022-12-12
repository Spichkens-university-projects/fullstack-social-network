import { Flex } from "@chakra-ui/react";
import { FC } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { postApi } from "../../../store/api/post-api";
import SidebarWithHeader from "../../layout/SidebarWithHeader";
import { IFriend } from "../../types/friend.interface";
import { IPost } from "../../types/post.interface";
import { IUser } from "../../types/user.interface";
import PostCreator from "../../ui/posts/PostCreator";
import PostList from "../../ui/posts/PostList";
import HeadTag from "../HeadTag";
import FriendsList from "./FriendsList";
import ProfileButtons from "./ui/ProfileButtons";
import ProfileCard from "./ui/ProfileCard";
import UserInfoPopup from "./ui/UserInfoPopup";

interface Props {
  user: IUser;
  friends: IFriend[];
  posts: IPost[];
}

const Profile: FC<Props> = ({ user, friends, posts }) => {
  const currentUserId = useAuth().user?.id;

  const { data } = postApi.useGetUsersPostsQuery(user?.id);

  return (
    <SidebarWithHeader>
      <HeadTag title={`${user.name} ${user.surname}`} />
      <Flex direction={"column"} gap={4}>
        <Flex direction={"row"} gap={4} flexWrap={{ md: "wrap" }}>
          <Flex direction={"column"} gap={4} grow={2}>
            <ProfileCard user={user} />
            <ProfileButtons
              isMyProfile={currentUserId === user.id}
              user={user}
            />
          </Flex>
          <Flex direction={"column"} gap={4} grow={1}>
            <UserInfoPopup user={user} />
            <FriendsList friends={friends} />
          </Flex>
        </Flex>
        <PostCreator user={user} />
        <PostList posts={data} />
      </Flex>
    </SidebarWithHeader>
  );
};

export default Profile;

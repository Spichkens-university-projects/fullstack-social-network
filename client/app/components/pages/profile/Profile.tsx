import { Flex } from "@chakra-ui/react";
import { FC } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { api } from "../../../store/api/api";
import SidebarWithHeader from "../../layout/SidebarWithHeader";
import { IFriend } from "../../types/friend.interface";
import { IPost } from "../../types/post.interface";
import { IUser } from "../../types/user.interface";
import HeadTag from "../HeadTag";
import FriendsList from "./FriendsList";

import PostCreator from "./posts/PostCreator";
import PostList from "./posts/PostList";
import ProfileButtons from "./ui/ProfileButtons";
import ProfileCard from "./ui/ProfileCard";
import UserInfo from "./ui/UserInfo";

interface Props {
  user: IUser;
  friends: IFriend[];
  posts: IPost[];
}

const Profile: FC<Props> = ({ user, friends, posts }) => {
  const currentUserId = useAuth().user?.id;

  const { data } = api.useGetUsersPostsQuery(currentUserId);

  return (
    <SidebarWithHeader>
      <Flex direction={"column"} gap={4} maxW={"960px"} mx={"auto"}>
        <HeadTag title={`${user.name} ${user.surname}`} />
        <Flex direction={"column"} gap={4}>
          <Flex direction={"row"} gap={4} flexWrap={{ md: "wrap" }}>
            <Flex direction={"column"} gap={4} flex={1}>
              <ProfileCard user={user} />
              <ProfileButtons
                isMyProfile={currentUserId === user.id}
                user={user}
              />
            </Flex>
            <Flex direction={"column"} gap={4} grow={{ sm: 1, lg: 0 }}>
              <UserInfo user={user} />
              <FriendsList friends={friends} />
            </Flex>
          </Flex>
          <PostCreator user={user} />
          <PostList posts={data} />
        </Flex>
      </Flex>
    </SidebarWithHeader>
  );
};

export default Profile;

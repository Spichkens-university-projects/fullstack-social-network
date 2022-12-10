import { Avatar, Flex, Heading, useColorModeValue } from "@chakra-ui/react";
import { shuffle } from "lodash";
import Link from "next/link";
import { FC } from "react";
import { IFriend } from "../../types/friend.interface";

interface Props {
  friends: IFriend[] | undefined;
}

const FriendsList: FC<Props> = ({ friends }) => {
  return (
    <Flex
      borderRadius={"20px"}
      p={4}
      direction={"column"}
      bg={useColorModeValue("white", "gray.800")}
      gap={4}
      shadow={"base"}
    >
      <Heading size={"md"} fontWeight={"500"}>
        Друзья: {friends?.length}
      </Heading>
      <Flex direction={"row"} gap={4}>
        {shuffle(friends)
          .slice(0, 5)
          .map((friend) => (
            <Link href={`/user/${friend.fromUser.id}`} key={friend.fromUser.id}>
              <Avatar
                title={`${friend.fromUser.name} ${friend.fromUser.surname}`}
                src={friend.fromUser.avatarPath}
                objectFit={"cover"}
                objectPosition={"center"}
                borderRadius={"full"}
              />
            </Link>
          ))}
      </Flex>
    </Flex>
  );
};

export default FriendsList;

import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC } from "react";
import { RelativeTime } from "../../../../utils/dayjs.config";
import { IReply } from "../../../types/post.interface";
import { IUser } from "../../../types/user.interface";

interface Props {
  reply: IReply;
  whom: IUser;
}
const ReplyItem: FC<Props> = ({ reply, whom }) => {
  const { replace } = useRouter();
  return (
    <Flex direction={"row"} gap={2} p={2}>
      <Avatar
        src={reply?.user.avatarPath}
        onClick={() => replace(`/user/${reply.user.id}`)}
        cursor={"pointer"}
      />
      <Box dir={"column"}>
        <Text
          _hover={{ textDecorationLine: "underline" }}
          onClick={() => replace(`/user/${reply.user.id}`)}
          cursor={"pointer"}
          fontWeight={"700"}
        >
          {`${reply.user.name} ${reply.user.surname}`}
        </Text>
        <Flex direction={"row"} gap={1}>
          <Text
            cursor={"pointer"}
            variant={"link"}
            color={"blue.600"}
            onClick={() => replace(`/user/${whom.id}`)}
          >
            {whom.name},
          </Text>
          <Text>{reply.replyBody}</Text>
        </Flex>
        <Flex direction={"row"} gap={2}>
          <Text>{RelativeTime(reply.createdAt)}</Text>
          {/*<ReplyButton />*/}
        </Flex>
      </Box>
    </Flex>
  );
};

export default ReplyItem;

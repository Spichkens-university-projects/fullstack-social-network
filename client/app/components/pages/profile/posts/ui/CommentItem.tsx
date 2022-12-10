import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { FC } from "react";
import { CustomDayJS } from "../../../../../utils/dayjs.config";
import { IComment } from "../../../../types/post.interface";
import ReplyButton from "./ReplyButton";
import ReplyItem from "./ReplyItem";

interface Props {
  comment: IComment;
}
const CommentItem: FC<Props> = ({ comment }) => {
  const { replace } = useRouter();
  return (
    <Flex direction={"column"}>
      <Flex direction={"row"} gap={2} p={2}>
        <Avatar
          src={comment?.user.avatarPath}
          onClick={() => replace(`/user/${comment.user.id}`)}
          cursor={"pointer"}
        />
        <Box dir={"column"}>
          <Text
            _hover={{ textDecorationLine: "underline" }}
            onClick={() => replace(`/user/${comment.user.id}`)}
            cursor={"pointer"}
            fontWeight={"700"}
          >
            {`${comment.user.name} ${comment.user.surname}`}
          </Text>
          <Text>{comment.commentBody}</Text>
          <Flex direction={"row"} gap={2}>
            <Text>{CustomDayJS.to(dayjs(comment.createdAt))}</Text>
            <ReplyButton />
          </Flex>
        </Box>
      </Flex>
      <Flex direction={"column"}>
        {comment.replies.map((reply) => (
          <ReplyItem reply={reply} whom={comment.user} key={reply.id} />
        ))}
      </Flex>
    </Flex>
  );
};

export default CommentItem;

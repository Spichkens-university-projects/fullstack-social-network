import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC } from "react";
import { useAuth } from "../../../../hooks/useAuth";
import { postApi } from "../../../../store/api/post-api";
import { RelativeTime } from "../../../../utils/dayjs.config";
import { IComment } from "../../../types/post.interface";
import DeleteButton from "../../DeleteButton";

import ReplyItem from "./ReplyItem";

interface Props {
  comment: IComment;
}

const CommentItem: FC<Props> = ({ comment }) => {
  const { replace } = useRouter();
  const { user } = useAuth();
  const [deleteComment, {}] = postApi.useDeleteCommentMutation();
  return (
    <Flex direction={"column"}>
      <Flex direction={"row"} p={2} alignItems={"center"}>
        <Flex flex={1} direction={"row"} gap={2}>
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
              <Text>{RelativeTime(comment.createdAt)}</Text>
              {/* TODO: кнопка ответа на коммент */}
              {/*<ReplyButton />*/}
            </Flex>
          </Box>
        </Flex>
        {comment.user.id === user?.id ? (
          <DeleteButton onClick={() => deleteComment(comment.id)} />
        ) : null}
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

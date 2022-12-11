import { Button } from "@chakra-ui/react";
import { FC } from "react";
import { postApi } from "../../../../store/api/post-api";
import { IComment } from "../../../types/post.interface";

interface Props {
  comment: IComment;
}
const ReplyButton: FC<Props> = ({ comment }) => {
  const [replyComment, {}] = postApi.useReplyCommentMutation();

  return (
    <Button
      variant={"link"}
      color={
        "blue.600"
      } /*onClick={() => replyComment({commentatorId: comment.user.id, parentId: comment.id,  }).unwrap()}*/
    >
      Ответить
    </Button>
  );
};

export default ReplyButton;

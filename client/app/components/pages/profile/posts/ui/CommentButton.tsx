import { Button, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import { FC } from "react";
import { FaRegComment } from "react-icons/fa";
import { IPost } from "../../../../types/post.interface";
import CommentModal from "./CommentModal";

interface Props {
  post: IPost | undefined;
}

const CommentButton: FC<Props> = ({ post }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        onClick={onOpen}
        leftIcon={<FaRegComment size={22} />}
        borderRadius={"20px"}
        bg={useColorModeValue("gray.100", "gray.700")}
      >
        {post?.comments.length}
      </Button>

      <CommentModal onClose={onClose} isOpen={isOpen} post={post} />
    </>
  );
};

export default CommentButton;

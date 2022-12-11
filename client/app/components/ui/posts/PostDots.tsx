import { IconButton } from "@chakra-ui/react";
import { FC } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IPost } from "../../types/post.interface";
import PostDotsPopover from "./PostDotsPopover";

interface Props {
  post: IPost | undefined;
}
const PostDots: FC<Props> = ({ post }) => {
  return (
    <PostDotsPopover post={post}>
      <IconButton
        variant="ghost"
        colorScheme="gray"
        aria-label="See menu"
        icon={<BsThreeDotsVertical />}
      />
    </PostDotsPopover>
  );
};
export default PostDots;

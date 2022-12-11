import { Button, useColorModeValue } from "@chakra-ui/react";
import { FC } from "react";

import { FaRegHeart } from "react-icons/fa";
import { useAuth } from "../../../hooks/useAuth";
import { postApi } from "../../../store/api/post-api";
import { IPost } from "../../types/post.interface";

interface Props {
  post: IPost | undefined;
}
const LikeButton: FC<Props> = ({ post }) => {
  const { user } = useAuth();

  const [likePost, {}] = postApi.useLikePostMutation();

  const setColorToLikeButton = (isHovered: boolean) => {
    const isLiked = post?.likes.find((liker) => liker.user.id === user?.id);
    if (isLiked) {
      if (isHovered) return useColorModeValue("red.700", "red.700");
      return useColorModeValue("red.500", "red.500");
    }
    if (isHovered) return useColorModeValue("gray.300", "gray.900");
    return useColorModeValue("gray.200", "gray.700");
  };
  return (
    <Button
      onClick={() => likePost(post?.id as number)}
      leftIcon={
        <FaRegHeart size={22} color={useColorModeValue("grey.700", "white")} />
      }
      borderRadius={"20px"}
      bg={setColorToLikeButton(false)}
      _hover={{ bg: setColorToLikeButton(true) }}
    >
      {post?.likes.length}
    </Button>
  );
};

export default LikeButton;

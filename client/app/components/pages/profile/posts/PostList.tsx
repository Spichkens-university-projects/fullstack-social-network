import { Flex } from "@chakra-ui/react";
import { FC } from "react";
import { IPost } from "../../../types/post.interface";

import PostItem from "./PostItem";

interface Props {
  posts: IPost[] | undefined;
}
const PostList: FC<Props> = ({ posts }) => {
  return (
    <Flex gap={4} direction={"column"}>
      {posts?.map((post: any) => (
        <PostItem key={post.id} post={post} />
      ))}
    </Flex>
  );
};

export default PostList;

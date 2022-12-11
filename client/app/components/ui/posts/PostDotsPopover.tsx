import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverTrigger,
  Portal,
} from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";
import { postApi } from "../../../store/api/post-api";
import { IPost } from "../../types/post.interface";

interface Props {
  post: IPost | undefined;
}
const PostDotsPopover: FC<PropsWithChildren<Props>> = ({ children, post }) => {
  const [deletePost, {}] = postApi.useDeletePostMutation();

  return (
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>
      <Portal>
        <PopoverContent>
          <PopoverArrow />
          <PopoverBody>
            <Button variant={"ghost"} w={"full"} colorScheme="gray">
              Редактировать
            </Button>
          </PopoverBody>
          <PopoverFooter>
            <Button
              variant={"ghost"}
              w={"full"}
              color={"red.500"}
              onClick={() => deletePost(post?.id)}
            >
              Удалить
            </Button>
          </PopoverFooter>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};
export default PostDotsPopover;

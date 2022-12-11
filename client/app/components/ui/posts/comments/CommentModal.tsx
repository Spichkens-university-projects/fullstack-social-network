import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { postApi } from "../../../../store/api/post-api";
import { RelativeTime } from "../../../../utils/dayjs.config";
import { IPost } from "../../../types/post.interface";
import LikeButton from "../LikeButton";

import CommentItem from "./CommentItem";

interface Props {
  onClose: () => void;
  isOpen: boolean;
  post: IPost | undefined;
}

const CommentModal: FC<Props> = ({ onClose, isOpen, post }) => {
  const { replace } = useRouter();
  const [commentPost, {}] = postApi.useCommentPostMutation();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<{ commentBody: string }>();

  const onSubmit: SubmitHandler<{ commentBody: string }> = async (
    data,
    event
  ) => {
    event?.preventDefault();
    commentPost({ postId: post?.id, ...data }).unwrap();
    reset();
  };

  return (
    <Modal
      size={"6xl"}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
      scrollBehavior={"inside"}
    >
      <ModalOverlay />
      <ModalContent overflow={"hidden"}>
        <ModalBody p={0}>
          <Flex direction={"row"}>
            {post?.mediaPath ? (
              <Image src={post?.mediaPath} maxH={"1000px"} maxW={"800px"} />
            ) : null}

            <Flex w={"full"} flexDirection={"column"}>
              <Flex
                alignItems={"center"}
                gap={2}
                direction={"row"}
                p={4}
                bg={useColorModeValue("gray.200", "gray.900")}
              >
                <Avatar
                  src={post?.user.avatarPath}
                  onClick={() => replace(`/user/${post?.user.id}`)}
                  cursor={"pointer"}
                />
                <Box dir={"column"}>
                  <Text
                    _hover={{ textDecorationLine: "underline" }}
                    onClick={() => replace(`/user/${post?.user.id}`)}
                    cursor={"pointer"}
                    fontWeight={"700"}
                  >
                    {`${post?.user.name} ${post?.user.surname}`}
                  </Text>
                  <Text>{RelativeTime(post?.createdAt)}</Text>
                </Box>
              </Flex>
              <Divider w={"full"} />
              <Box p={2}>
                <LikeButton post={post} />
              </Box>
              <Divider w={"full"} />
              <Flex flex={1} direction={"column"}>
                {post?.comments.map((comment) => (
                  <CommentItem comment={comment} key={comment.id} />
                ))}
              </Flex>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Flex direction={"column"}>
                  <Textarea
                    id={"commentBody"}
                    placeholder={"Написать комментарий..."}
                    {...register("commentBody")}
                    rounded={0}
                    borderWidth={2}
                    borderColor={"blue.600"}
                  />
                  <Flex
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    p={2}
                  >
                    <Box px={2}>{`${post?.comments.length} коментариев`}</Box>
                    <Flex gap={2}>
                      <Button onClick={() => reset()}>Отмена</Button>
                      <Button
                        type={"submit"}
                        bg={"blue.600"}
                        _hover={{
                          bg: "blue.500",
                        }}
                        color={"white"}
                      >
                        Отправить
                      </Button>
                    </Flex>
                  </Flex>
                </Flex>
              </form>
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CommentModal;

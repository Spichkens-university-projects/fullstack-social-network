import {
  Avatar,
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  IconButton,
  Image,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { FC } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { api } from "../../../../store/api/api";
import { CustomDayJS } from "../../../../utils/dayjs.config";
import { IPost } from "../../../types/post.interface";
import CommentButton from "./ui/CommentButton";
import LikeButton from "./ui/LikeButton";
import PostDotsPopover from "./ui/PostDotsPopover";

interface Props {
  post: IPost;
}

const PostItem: FC<Props> = ({ post }) => {
  const { data } = api.useGetPostByIdQuery(post.id);

  return (
    <Card
      bg={useColorModeValue("white", "gray.800")}
      borderRadius={"20px"}
      shadow={"base"}
    >
      <CardHeader>
        <Flex>
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Avatar src={data?.user.avatarPath} />
            <Box>
              <Heading size="sm">{`${data?.user.name} ${data?.user.surname}`}</Heading>
              <Text>{CustomDayJS.to(dayjs(post.createdAt))}</Text>
            </Box>
          </Flex>
          <PostDotsPopover post={data}>
            <IconButton
              variant="ghost"
              colorScheme="gray"
              aria-label="See menu"
              icon={<BsThreeDotsVertical />}
            />
          </PostDotsPopover>
        </Flex>
      </CardHeader>
      <CardBody>
        <Text>{data?.description}</Text>
      </CardBody>

      {data?.mediaPath ? (
        <Image objectFit="contain" maxH={"512px"} src={data?.mediaPath} />
      ) : null}

      <CardFooter
        gap={4}
        justify="start"
        flexWrap="wrap"
        sx={{
          "& > button": {
            minW: "68px",
          },
        }}
      >
        <LikeButton post={data} />
        <CommentButton post={data} />
      </CardFooter>
    </Card>
  );
};

export default PostItem;

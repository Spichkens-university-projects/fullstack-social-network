import {
  Avatar,
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Image,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FC } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { postApi } from "../../../store/api/post-api";
import { RelativeTime } from "../../../utils/dayjs.config";
import { IPost } from "../../types/post.interface";
import CommentButton from "./comments/CommentButton";
import LikeButton from "./LikeButton";
import PostDots from "./PostDots";

interface Props {
  post: IPost;
}

const PostItem: FC<Props> = ({ post }) => {
  const { data } = postApi.useGetPostByIdQuery(post.id);
  const { user } = useAuth();

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
              <Text>{RelativeTime(data?.createdAt)}</Text>
            </Box>
          </Flex>
          {user?.id === data?.user.id ? <PostDots post={data} /> : null}
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

import { Avatar, Flex, HStack, Text } from "@chakra-ui/react";
import { FC, useEffect } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { userApi } from "../../../store/api/user-api";
import { RelativeTime } from "../../../utils/dayjs.config";
import { IMessage } from "../../types/message.interface";

interface Props {
  message: IMessage;
}

const MessageItem: FC<Props> = ({ message }) => {
  const currentUserId = useAuth().user?.id;
  const [getUser, { data: user }] = userApi.useLazyGetUserDataQuery();

  useEffect(() => {
    getUser(message.senderId);
  }, []);

  const isCurrentUser = currentUserId === message.senderId;

  return (
    <Flex
      bg={isCurrentUser ? "blue.700" : "gray.800"}
      p={2}
      rounded={"lg"}
      roundedTopRight={isCurrentUser ? "none" : "lg"}
      roundedTopLeft={isCurrentUser ? "lg" : "none"}
      gap={2}
      alignSelf={isCurrentUser ? "flex-end" : "flex-start"}
      flexDirection={isCurrentUser ? "row" : "row-reverse"}
    >
      <Avatar
        src={message.senderAvatar}
        size={"sm"}
        order={isCurrentUser ? 0 : 1}
      />
      <Flex direction={"column"}>
        <HStack>
          <Text
            fontSize={"sm"}
            fontWeight={"600"}
          >{`${user?.name} ${user?.surname}`}</Text>
          <Text justifySelf={"flex-end"} fontSize={"xs"}>
            {RelativeTime(message.createdAt)}
          </Text>
        </HStack>
        <Text>{message.message}</Text>
      </Flex>
    </Flex>
  );
};
export default MessageItem;

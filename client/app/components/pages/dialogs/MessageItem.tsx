import { Avatar, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { FC } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { RelativeTime } from "../../../utils/dayjs.config";
import { IMessage } from "../../types/message.interface";

interface Props {
  message: IMessage;
}

const MessageItem: FC<Props> = ({ message }) => {
  const currentUserId = useAuth().user?.id;

  const isCurrentUser = currentUserId === message.user.id;

  return (
    <Flex
      gap={2}
      alignSelf={isCurrentUser ? "flex-end" : "flex-start"}
      flexDirection={isCurrentUser ? "row" : "row-reverse"}
    >
      {!isCurrentUser ? (
        <Avatar src={message.user.avatarPath} size={"sm"} order={1} />
      ) : null}
      <Flex
        dir={"column"}
        rounded={"lg"}
        roundedTopRight={isCurrentUser ? "none" : "lg"}
        roundedTopLeft={isCurrentUser ? "lg" : "none"}
        direction={"column"}
        bg={useColorModeValue(
          isCurrentUser ? "blue.600" : "gray.500",
          isCurrentUser ? "blue.700" : "gray.400"
        )}
        p={2}
      >
        {!isCurrentUser ? (
          <Text
            color={"white"}
            fontSize={"sm"}
            fontWeight={"600"}
          >{`${message?.user.name} ${message?.user.surname}`}</Text>
        ) : null}
        <Text color={"white"}>{message.message}</Text>
        <Text
          color={useColorModeValue(
            isCurrentUser ? "blue.100" : "gray.300",
            isCurrentUser ? "blue.400" : "gray.300"
          )}
          justifySelf={"flex-end"}
          fontSize={"xs"}
        >
          {RelativeTime(message.createdAt)}
        </Text>{" "}
      </Flex>
    </Flex>
  );
};
export default MessageItem;

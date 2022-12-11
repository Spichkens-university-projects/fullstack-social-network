import { Flex, useColorModeValue } from "@chakra-ui/react";
import { FC } from "react";
import { IMessage } from "../../types/message.interface";
import MessageItem from "./MessageItem";

interface Props {
  messages: IMessage[];
}

const MessagesList: FC<Props> = ({ messages }) => {
  return (
    <Flex
      overflow={"auto"}
      justifyContent={"flex-end"}
      alignItems={"flex-end"}
      justifyItems={"flex-end"}
      sx={{
        "::-webkit-scrollbar": {
          display: "none",
        },
      }}
      direction={"column"}
      overflowY={"auto"}
      minH={"75vh"}
      bg={useColorModeValue("white", "gray.700")}
      p={2}
      gap={3}
    >
      {messages.map((message) => (
        <MessageItem key={message.messageId} message={message} />
      ))}
    </Flex>
  );
};

export default MessagesList;

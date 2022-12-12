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
      flex={1}
      sx={{
        "::-webkit-scrollbar": {
          display: "none",
        },
      }}
      direction={"column"}
      height={"full"}
      bg={useColorModeValue("white", "gray.700")}
      justifyContent={"flex-end"}
    >
      <Flex
        p={2}
        gap={3}
        direction={"column"}
        overflowY={"auto"}
        css={{
          "&::-webkit-scrollbar": {
            width: "4px",
          },
          "&::-webkit-scrollbar-track": {
            width: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "gray",
            opacity: 0.1,
            borderRadius: "24px",
          },
        }}
      >
        {messages.map((message) => (
          <MessageItem key={message.id} message={message} />
        ))}
      </Flex>
    </Flex>
  );
};

export default MessagesList;

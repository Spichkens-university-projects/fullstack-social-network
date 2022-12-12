import {
  Button,
  Divider,
  Flex,
  Input,
  useColorModeValue,
} from "@chakra-ui/react";
import { ChangeEvent, FC, useState } from "react";
import { AiOutlineSend } from "react-icons/ai";

import { useAuth } from "../../../hooks/useAuth";
import useChat from "../../../hooks/useChat";
import { useKeyboard } from "../../../hooks/useKeyboard";
import { dialogApi } from "../../../store/api/dialog-api";
import SidebarWithHeader from "../../layout/SidebarWithHeader";
import HeadTag from "../HeadTag";
import MessagesList from "./MessagesList";
import MessengerHeader from "./MessengerHeader";

interface Props {
  roomId: string;
}

const DialogWithUser: FC<Props> = ({ roomId }) => {
  const { user } = useAuth();
  const [value, setValue] = useState<string>("");
  const { data, isLoading } = dialogApi.useGetDialogByRoomIdQuery(roomId);
  const { messages, sendMessage } = useChat(roomId);

  const onSendButtonClick = () => {
    sendMessage({ userId: user?.id, message: value, roomId });
    setValue("");
  };
  useKeyboard("Enter", onSendButtonClick);

  return (
    <SidebarWithHeader>
      <HeadTag
        title={`Диалог с ${data?.withUser.name} ${data?.withUser.surname}`}
      />
      <Flex
        direction={"column"}
        justifyContent={"flex-end"}
        minH={"90vh"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"lg"}
        overflow={"hidden"}
      >
        <MessengerHeader data={data} />
        <Divider h={"1px"} bg={"gray.400"} />
        <MessagesList messages={messages} />
        <Divider />
        <Flex alignItems={"center"} px={4} py={2} gap={4}>
          <Input
            rounded={"lg"}
            borderColor={"blue.600"}
            borderWidth={2}
            value={value}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setValue(e.target.value)
            }
          />
          <Button onClick={onSendButtonClick} disabled={value.length < 0}>
            <AiOutlineSend size={28} />
          </Button>
        </Flex>
      </Flex>
    </SidebarWithHeader>
  );
};

export default DialogWithUser;

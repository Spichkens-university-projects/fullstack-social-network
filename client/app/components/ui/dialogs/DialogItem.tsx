import { Avatar, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC } from "react";
import { IDialog } from "../../types/dialog.interface";

interface Props {
  dialog: IDialog;
}

const DialogItem: FC<Props> = ({ dialog }) => {
  const { replace } = useRouter();

  const goToUserProfile = async () => {
    await replace(`/user/${dialog.withUser.id}`);
  };

  const goToDialogPage = async () => {
    await replace(`/dialogs/${dialog.roomId}`);
  };

  return (
    <Flex
      onClick={goToDialogPage}
      flex={1}
      p={4}
      bg={useColorModeValue("white", "gray.800")}
      rounded={"lg"}
      alignItems={"center"}
      cursor={"pointer"}
      _hover={{ bg: useColorModeValue("gray.200", "gray.700") }}
    >
      <Flex flex={1} alignItems={"center"} gap={4} direction={"row"}>
        <Avatar
          src={dialog.withUser.avatarPath}
          size={"xl"}
          onClick={goToUserProfile}
          cursor={"pointer"}
        />
        <Flex direction={"column"}>
          <Text
            fontWeight={"600"}
            fontSize={"xl"}
            color={useColorModeValue("gray.600", "gray.100")}
          >{`${dialog.withUser.name} ${dialog.withUser.surname}`}</Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default DialogItem;

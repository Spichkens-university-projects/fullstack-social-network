import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Button,
  Flex,
  HStack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC } from "react";
import { TbDots } from "react-icons/tb";
import { IDialog } from "../../types/dialog.interface";

interface Props {
  data: IDialog | undefined;
}

const MessengerHeader: FC<Props> = ({ data }) => {
  const { replace } = useRouter();

  const goToUserProfilePage = async () => {
    await replace(`/user/${data?.withUser.id}`);
  };
  return (
    <Flex
      justifyContent={"space-between"}
      alignItems={"center"}
      bg={useColorModeValue("white", "gray.800")}
      py={2}
    >
      <Button variant={"ghost"} onClick={() => replace("/dialogs")}>
        <ArrowBackIcon />
      </Button>
      <HStack>
        <Avatar
          onClick={goToUserProfilePage}
          size={"sm"}
          src={data?.withUser.avatarPath}
          cursor={"pointer"}
        />
        <Text
          onClick={goToUserProfilePage}
          _hover={{ textDecorationLine: "underline", cursor: " pointer" }}
        >{`${data?.withUser.name} ${data?.withUser.surname}`}</Text>
      </HStack>
      <Button variant={"ghost"} onClick={() => replace("/dialogs")}>
        <TbDots />
      </Button>
    </Flex>
  );
};

export default MessengerHeader;

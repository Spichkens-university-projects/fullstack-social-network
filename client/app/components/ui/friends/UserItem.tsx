import { Avatar, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import { dialogApi } from "../../../store/api/dialog-api";
import { RelationType } from "../../pages/friends/Friends";
import { IUser } from "../../types/user.interface";
import Buttons from "./UserIcon";

interface Props {
  type: RelationType;
  user: IUser | undefined;
}
const UserItem: FC<Props> = ({ user, type }) => {
  const { replace } = useRouter();

  const goToUserProfile = async () => {
    await replace(`/user/${user?.id}`);
  };

  const [createDialog, { data, isSuccess }] =
    dialogApi.useCreateDialogMutation();

  const onClickOnCreateDialogButton = async () => {
    await createDialog(user?.id);
  };

  useEffect(() => {
    const redirect = async () => {
      await replace(`/dialogs/${data?.roomId}`);
    };
    if (isSuccess) redirect();
  }, [isSuccess]);

  return (
    <Flex
      flex={1}
      p={4}
      bg={useColorModeValue("white", "gray.800")}
      rounded={"lg"}
      alignItems={"center"}
    >
      <Flex flex={1} alignItems={"center"} gap={4} direction={"row"}>
        <Avatar
          src={user?.avatarPath}
          size={"xl"}
          onClick={goToUserProfile}
          cursor={"pointer"}
        />
        <Flex direction={"column"}>
          <Text
            fontWeight={"600"}
            fontSize={"xl"}
            color={useColorModeValue("gray.600", "gray.100")}
            _hover={{ textDecorationLine: "underline", cursor: "pointer" }}
          >{`${user?.name} ${user?.surname}`}</Text>
          <Text color={useColorModeValue("gray.600", "gray.100")}>
            @{user?.nickname}
          </Text>
          <Text
            onClick={onClickOnCreateDialogButton}
            variant={"link"}
            color={"blue.600"}
            cursor={"pointer"}
            _hover={{ textDecorationLine: "underline" }}
          >
            Написать сообщение
          </Text>
        </Flex>
      </Flex>

      <Buttons type={type} user={user} />
    </Flex>
  );
};

export default UserItem;

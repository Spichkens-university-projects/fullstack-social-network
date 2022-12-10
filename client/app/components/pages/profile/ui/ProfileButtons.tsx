import { Box, Button, Stack, useColorModeValue } from "@chakra-ui/react";
import Link from "next/link";
import { FC } from "react";
import { IUser } from "../../../types/user.interface";

interface Props {
  isMyProfile: boolean;
  user: IUser;
}
const ProfileButtons: FC<Props> = ({ isMyProfile, user }) => {
  return (
    <Stack
      borderRadius={"20px"}
      p={4}
      direction={"row"}
      spacing={4}
      flex={1}
      bg={useColorModeValue("white", "gray.800")}
      shadow={"base"}
    >
      {isMyProfile ? (
        <Box flex={1}>
          <Link href={"/settings"}>
            <Button
              w={"full"}
              fontSize={"sm"}
              rounded={"full"}
              _focus={{
                bg: "gray.650",
              }}
            >
              Редактировать
            </Button>
          </Link>
        </Box>
      ) : (
        <>
          <Button
            flex={1}
            fontSize={"sm"}
            rounded={"full"}
            _focus={{
              bg: "gray.200",
            }}
          >
            Сообщение
          </Button>
          <Button
            flex={1}
            fontSize={"sm"}
            rounded={"full"}
            bg={"blue.600"}
            color={"white"}
            boxShadow={
              "0px 1px 25px -5px rgb(66 100 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
            }
            _hover={{
              bg: "blue.500",
            }}
            _focus={{
              bg: "blue.500",
            }}
          >
            Подать заявку
          </Button>
        </>
      )}
    </Stack>
  );
};

export default ProfileButtons;

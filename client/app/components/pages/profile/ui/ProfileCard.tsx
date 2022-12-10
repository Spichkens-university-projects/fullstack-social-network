import { Avatar, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { FC } from "react";
import { IUser } from "../../../types/user.interface";

interface Props {
  user: IUser | undefined;
}
const ProfileCard: FC<Props> = ({ user }) => {
  return (
    <Flex
      borderRadius="20px"
      bg={useColorModeValue("white", "gray.800")}
      p="20px"
      alignItems="center"
      direction="column"
      shadow={"base"}
    >
      <Flex flexDirection="column">
        <Avatar
          src={user?.avatarPath}
          mx="auto"
          borderWidth={5}
          borderColor={useColorModeValue("blue.600", "gray.100")}
          width="128px"
          height="128px"
          borderRadius="100%"
          objectFit={"cover"}
        />
        <Text
          fontWeight="600"
          color={useColorModeValue("gray.600", "gray.100")}
          textAlign="center"
          fontSize="xl"
        >
          {`${user?.name} ${user?.surname}`}
        </Text>
        <Text
          color={useColorModeValue("blue.600", "gray.100")}
          textAlign="center"
          fontSize="sm"
          fontWeight="500"
        >
          @{user?.nickname}
        </Text>
      </Flex>
    </Flex>
  );
};

export default ProfileCard;

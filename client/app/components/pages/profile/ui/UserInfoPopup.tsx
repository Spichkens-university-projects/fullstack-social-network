import {
  Box,
  Divider,
  Flex,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { FC } from "react";
import { IUser } from "../../../types/user.interface";

interface Props {
  user: IUser;
}

const UserInfoPopup: FC<Props> = ({ user }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex
        shadow={"base"}
        p={4}
        bg={useColorModeValue("white", "gray.800")}
        borderRadius={"20px"}
        h={"full"}
        direction={"column"}
        justify={"space-between"}
      >
        <Box>
          <Text size={"md"} fontWeight={"500"}>
            Статус:
          </Text>
          <Text size={"sm"} fontWeight={"400"} noOfLines={1}>
            {user.status}
          </Text>
        </Box>
        <Link color={"gray.500"} onClick={onOpen}>
          Подробнее
        </Link>
      </Flex>

      <Modal
        onClose={onClose}
        isOpen={isOpen}
        isCentered
        scrollBehavior={"inside"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Подробная информация</ModalHeader>
          <ModalCloseButton />
          <Divider />
          <ModalBody>Тут инфа</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UserInfoPopup;

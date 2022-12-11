import { useColorModeValue } from "@chakra-ui/react";
import { FC } from "react";
import { FiX } from "react-icons/fi";

interface Props {
  onClick: () => void;
}
const DeleteButton: FC<Props> = ({ onClick }) => {
  return (
    <FiX
      size={20}
      onClick={onClick}
      cursor={"pointer"}
      color={useColorModeValue("gray.900", "white")}
    />
  );
};

export default DeleteButton;

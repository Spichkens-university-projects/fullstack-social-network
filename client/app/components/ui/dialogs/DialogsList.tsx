import { Flex } from "@chakra-ui/react";
import { FC } from "react";
import { IDialog } from "../../types/dialog.interface";
import DialogItem from "./DialogItem";

interface Props {
  dialogs: IDialog[];
}

const DialogsList: FC<Props> = ({ dialogs }) => {
  return (
    <Flex direction={"column"} gap={4}>
      {dialogs?.map((dialog) => (
        <DialogItem dialog={dialog} key={dialog.roomId} />
      ))}
    </Flex>
  );
};

export default DialogsList;

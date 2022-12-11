import { Button, Flex } from "@chakra-ui/react";
import { FC } from "react";
import { friendApi } from "../../../store/api/friend-api";
import { RelationType } from "../../pages/friends/Friends";
import { IUser } from "../../types/user.interface";

interface Props {
  user: IUser | undefined;
  type: RelationType;
}
const Buttons: FC<Props> = ({ type, user }) => {
  const [sendRequest, {}] = friendApi.useSendRequestMutation();
  const [cancelRequest, {}] = friendApi.useCancelRequestMutation();
  const [acceptRequest, {}] = friendApi.useAcceptRequestMutation();
  const [rejectRequest, {}] = friendApi.useRejectRequestMutation();
  const [removeFriend, {}] = friendApi.useRemoveFriendMutation();

  if (type === RelationType.friend)
    return <Button onClick={() => removeFriend(user?.id)}>Удалить</Button>;

  if (type === RelationType.subscriber)
    return <Button onClick={() => cancelRequest(user?.id)}>Отменить</Button>;

  if (type === RelationType.unknownUser)
    return <Button onClick={() => sendRequest(user?.id)}>Добавить</Button>;
  else
    return (
      <Flex direction={"column"} gap={4}>
        <Button onClick={() => acceptRequest(user?.id)}>Принять</Button>
        <Button onClick={() => rejectRequest(user?.id)}>Отклонить</Button>
      </Flex>
    );
};
export default Buttons;

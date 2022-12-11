import { Flex } from "@chakra-ui/react";
import { FC } from "react";
import { RelationType } from "../../pages/friends/Friends";
import { IUser } from "../../types/user.interface";
import UserItem from "./UserItem";

interface Props {
  type: RelationType;
  users: IUser[] | undefined;
}

const UsersList: FC<Props> = ({ users, type }) => {
  return (
    <Flex py={4} direction={"column"} gap={4}>
      {users?.map((user) => (
        <UserItem key={user?.id} user={user} type={type} />
      ))}
    </Flex>
  );
};

export default UsersList;

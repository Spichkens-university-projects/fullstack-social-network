import { Input } from "@chakra-ui/react";
import { TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import { useAuth } from "../../../hooks/useAuth";
import useSearch from "../../../hooks/useSearch";
import { friendApi } from "../../../store/api/friend-api";
import SidebarWithHeader from "../../layout/SidebarWithHeader";
import UsersList from "../../ui/friends/UsersList";
import StyledTab from "../../ui/StyledTab";
import HeadTag from "../HeadTag";

export enum RelationType {
  friend = 1,
  subscriber = 2,
  subscription = 3,
  unknownUser = 4,
}

const Friends = () => {
  const { user } = useAuth();

  const { data, searchTerm, handleSearch, isFetching } = useSearch(
    friendApi.useGetAllUnknownUsersQuery
  );

  const { data: friends } = friendApi.useGetFriendsQuery(user?.id);
  const { data: subscribers } = friendApi.useGetSubscribersQuery(null);
  const { data: subscribes } = friendApi.useGetSubscribesQuery(null);

  return (
    <SidebarWithHeader>
      <HeadTag title={"Друзья"} />
      <Tabs isFitted variant={"line"} position={"sticky"}>
        <TabList>
          <StyledTab title={"Друзья"}>{friends?.length}</StyledTab>
          <StyledTab title={"Подписчики"}>{subscribers?.length}</StyledTab>
          <StyledTab title={"Подписки"}>{subscribes?.length}</StyledTab>
          <StyledTab title={"Поиск друзей"} />
        </TabList>
        <TabPanels>
          <TabPanel>
            <UsersList
              users={friends?.map((friend) => friend.fromUser)}
              type={RelationType.friend}
            />
          </TabPanel>
          <TabPanel>
            <UsersList
              users={subscribers?.map((subscriber) => subscriber.fromUser)}
              type={RelationType.subscription}
            />
          </TabPanel>
          <TabPanel>
            <UsersList
              users={subscribes?.map((subscribe) => subscribe.toUser)}
              type={RelationType.subscriber}
            />
          </TabPanel>
          <TabPanel>
            <Input
              type={"text"}
              placeholder="Поиск..."
              value={searchTerm}
              onChange={handleSearch}
            />
            <UsersList users={data} type={RelationType.unknownUser} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </SidebarWithHeader>
  );
};

export default Friends;

import SidebarWithHeader from "../../app/components/layout/SidebarWithHeader";
import Friends from "../../app/components/pages/friends/Friends";
import { PrivateNextPage } from "../../app/providers/private-route.interface";

const FriendsPage: PrivateNextPage = () => {
  return (
    <SidebarWithHeader>
      <Friends />
    </SidebarWithHeader>
  );
};

FriendsPage.isPrivatePage = true;

export default FriendsPage;

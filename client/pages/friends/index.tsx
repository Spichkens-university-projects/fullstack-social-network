import Friends from "../../app/components/pages/friends/Friends";
import { PrivateNextPage } from "../../app/providers/private-route.interface";

const FriendsPage: PrivateNextPage = () => {
  return <Friends />;
};

FriendsPage.isPrivatePage = true;

export default FriendsPage;

import SidebarWithHeader from "../../app/components/layout/SidebarWithHeader";
import Dialogs from "../../app/components/pages/dialogs/Dialogs";
import { PrivateNextPage } from "../../app/providers/private-route.interface";

const DialogsPage: PrivateNextPage = () => {
  return (
    <SidebarWithHeader>
      <Dialogs />
    </SidebarWithHeader>
  );
};

DialogsPage.isPrivatePage = true;

export default DialogsPage;

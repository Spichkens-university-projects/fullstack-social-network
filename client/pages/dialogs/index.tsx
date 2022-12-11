import Dialogs from "../../app/components/pages/dialogs/Dialogs";
import { PrivateNextPage } from "../../app/providers/private-route.interface";

const DialogsPage: PrivateNextPage = () => {
  return <Dialogs />;
};

DialogsPage.isPrivatePage = true;

export default DialogsPage;

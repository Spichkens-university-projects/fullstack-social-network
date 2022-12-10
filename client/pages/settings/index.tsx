import SidebarWithHeader from "../../app/components/layout/SidebarWithHeader";
import Settings from "../../app/components/pages/settings/Settings";
import { PrivateNextPage } from "../../app/providers/private-route.interface";

const SettingsPage: PrivateNextPage = () => {
  return (
    <SidebarWithHeader>
      <Settings />
    </SidebarWithHeader>
  );
};

SettingsPage.isPrivatePage = true;

export default SettingsPage;

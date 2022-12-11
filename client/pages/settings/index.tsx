import Settings from "../../app/components/pages/settings/Settings";
import { PrivateNextPage } from "../../app/providers/private-route.interface";

const SettingsPage: PrivateNextPage = () => {
  return <Settings />;
};

SettingsPage.isPrivatePage = true;

export default SettingsPage;

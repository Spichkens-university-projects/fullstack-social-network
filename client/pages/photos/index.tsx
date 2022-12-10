import SidebarWithHeader from "../../app/components/layout/SidebarWithHeader";
import Photos from "../../app/components/pages/photos/Photos";
import { PrivateNextPage } from "../../app/providers/private-route.interface";

const PhotosPage: PrivateNextPage = () => {
  return (
    <SidebarWithHeader>
      <Photos />
    </SidebarWithHeader>
  );
};

PhotosPage.isPrivatePage = true;

export default PhotosPage;

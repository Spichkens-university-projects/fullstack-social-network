import Photos from "../../app/components/pages/photos/Photos";
import { PrivateNextPage } from "../../app/providers/private-route.interface";

const PhotosPage: PrivateNextPage = () => {
  return <Photos />;
};

PhotosPage.isPrivatePage = true;

export default PhotosPage;

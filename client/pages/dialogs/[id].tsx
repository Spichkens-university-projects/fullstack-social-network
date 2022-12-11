import { GetStaticPaths, GetStaticProps } from "next";
import DialogWithUser from "../../app/components/pages/dialogs/DialogWithUser";
import { PrivateNextPage } from "../../app/providers/private-route.interface";
import { DialogService } from "../../app/services/dialog.service";

interface Props {
  roomId: string;
}

const DialogWithUserPage: PrivateNextPage<Props> = ({ roomId }) => {
  return <DialogWithUser roomId={roomId} />;
};

DialogWithUserPage.isPrivatePage = true;

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const dialogs = await DialogService.getAllDialogs();
    const paths = dialogs.map((dialog) => ({
      params: {
        id: String(dialog.roomId),
      },
    }));

    return {
      paths,
      fallback: "blocking",
    };
  } catch (e) {
    return {
      paths: [],
      fallback: false,
    };
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  return {
    props: {
      roomId: String(params?.id),
    },
  };
};

export default DialogWithUserPage;

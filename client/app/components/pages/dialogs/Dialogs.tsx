import { Input, Spinner } from "@chakra-ui/react";
import { useAuth } from "../../../hooks/useAuth";
import useSearch from "../../../hooks/useSearch";
import { dialogApi } from "../../../store/api/dialog-api";
import SidebarWithHeader from "../../layout/SidebarWithHeader";
import { IDialog } from "../../types/dialog.interface";
import DialogsList from "../../ui/dialogs/DialogsList";
import HeadTag from "../HeadTag";

const Dialogs = () => {
  const { data, isFetching, handleSearch, searchTerm } = useSearch(
    dialogApi.useGetUserDialogsQuery
  );

  const { user } = useAuth();
  const dialogs = data?.filter(
    (dialog: IDialog) => dialog?.user?.id === user?.id
  );

  return (
    <SidebarWithHeader>
      <HeadTag title={"Диалоги"} />
      <Input
        type={"text"}
        placeholder="Поиск..."
        value={searchTerm}
        onChange={handleSearch}
      />
      {isFetching ? <Spinner size={"xl"} /> : <DialogsList dialogs={dialogs} />}
    </SidebarWithHeader>
  );
};

export default Dialogs;

import { axiosClassic } from "../api/axios";
import { IDialog } from "../components/types/dialog.interface";

export const DialogService = {
  async getAllDialogs() {
    const response = await axiosClassic.get<IDialog[]>(`/dialog/all`);
    return response.data;
  },
};

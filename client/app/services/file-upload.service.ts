import { axiosClassic } from "../api/axios";
import { IUser } from "../components/types/user.interface";

export const uploadFile = async (
  selectedFiles: FileList | null,
  user: IUser | undefined,
  accessToken: string,
  setImageUploadingProgress: React.Dispatch<React.SetStateAction<number>>,
  setImageToUpload: React.Dispatch<React.SetStateAction<string>>
) => {
  const formData = new FormData();
  if (selectedFiles) {
    formData.append("media", selectedFiles[0]);
    setImageToUpload(() => selectedFiles[0].name);
    await axiosClassic.post(`/media/upload?folder=user_${user?.id}`, formData, {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        setImageUploadingProgress(() => Math.floor((loaded * 100) / total!));
      },
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return `/uploads/user_${user?.id}/${selectedFiles[0].name}`;
  }
  return undefined;
};

export const deleteMediaFromServer = async (
  user: IUser | undefined,
  accessToken: string,
  fileName: string
) => {
  await axiosClassic.delete(
    `/media/delete?folder=user_${user?.id}/${fileName}`,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

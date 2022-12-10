import { axiosClassic } from "../api/axios";
import { IUser } from "../components/types/user.interface";

export const FriendsService = {
  async getAllFriends(userId: number) {
    const response = await axiosClassic.get<IUser[]>(
      `/relationship/friends?of=${userId}`
    );
    return response.data;
  },
};

import { axiosClassic } from "../api/axios";
import { IPost } from "../components/types/post.interface";

export const PostService = {
  async getPostsOfUser(userId: number) {
    const response = await axiosClassic.get<IPost[]>(`/post?of=${userId}`);
    return response.data;
  },
};

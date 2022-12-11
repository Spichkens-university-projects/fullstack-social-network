export interface CreatePostDto {
  userId: number | undefined;
  description: string | undefined;
  mediaPath?: string | undefined;
}

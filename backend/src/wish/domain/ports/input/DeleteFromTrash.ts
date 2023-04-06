export interface DeleteWishFromTrash {
  deleteAllFromTrash(userId: string): Promise<boolean>;
}

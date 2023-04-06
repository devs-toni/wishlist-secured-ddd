export interface DeleteAllWishes {
  deleteAll(userId: string): Promise<boolean>;
}

export interface DeleteCompletedWishes {
  deleteAllCompleted(userId: string): Promise<boolean>;
}

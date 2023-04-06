export interface RecoverAllWishes {
  recoverAll(userId: string): Promise<boolean>;
}

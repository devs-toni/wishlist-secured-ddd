
export interface RecoverWish {
  recoverById(id: string): Promise<boolean>;
}

export interface DeleteWish {
  deleteById(id: string): Promise<boolean>;
}

export interface Wish {
  id: string;
  text: string;
  createdAt: Date;
  userId: string;
  isCompleted: boolean;
  isDeleted: boolean;
}

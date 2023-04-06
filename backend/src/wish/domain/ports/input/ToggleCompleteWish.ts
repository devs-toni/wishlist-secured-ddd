export interface ToggleCompleteWish {
  toggleCompleteById(id: string): Promise<boolean>;
}

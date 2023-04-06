export class Wish {

  private id: string;
  private text: string;
  private createdAt: Date;
  private userId: string;
  private isCompleted: boolean;
  private isDeleted: boolean;

  constructor(text: string, createdAt: Date, userId: string) {
    this.text = text;
    this.createdAt = createdAt;
    this.userId = userId;
    this.isCompleted = false;
    this.isDeleted = false;
  }

  public getId(): string {
    return this.id;
  }

  public setId(value: string) {
    this.id = value;
  }

  public getText(): string {
    return this.text;
  }

  public setText(value: string) {
    this.text = value;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public setCreatedAt(value: Date) {
    this.createdAt = value;
  }

  public getUserId(): string {
    return this.userId;
  }

  public setUserId(value: string) {
    this.userId = value;
  }

  public getIsCompleted(): boolean {
    return this.isCompleted;
  }

  public setIsCompleted(value: boolean) {
    this.isCompleted = value;
  }
}

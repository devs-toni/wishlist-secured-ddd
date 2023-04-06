export interface DatabaseConnection {
  connect(): Promise<Object>;
}

export interface Result<T> {
  status: boolean;
  message: string;
  data: T | null;
}

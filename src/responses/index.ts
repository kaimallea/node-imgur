export interface Response {
  data: {
    [key: string]: any | undefined;
  };
  success: boolean;
  status: number;
}

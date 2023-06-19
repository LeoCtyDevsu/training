export interface UserModel {
  userId?: string;
  name?: string;
  username?: string;
  email?: string;
  password?: string;
  category?: number[];
  accessToken?: string;
  tokenType?: string;
}

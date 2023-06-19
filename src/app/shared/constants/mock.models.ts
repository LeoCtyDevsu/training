import { UserModel } from '../models/user.model';

export const mockUser: UserModel = {
  userId: 'mockData',
  name: 'mockData',
  username: 'mockData',
  email: 'mockData',
  password: 'mockData',
  category: [1, 2, 3],
  accessToken: 'mockData',
  tokenType: 'mockData',
};

export const mockUserDefault: UserModel = {
  userId: 'mockDefault',
  name: 'mockDefault',
  username: 'mockDefault',
  email: 'mockDefault',
  password: 'mockDefault',
  category: [4, 5, 6],
  accessToken: 'mockDefault',
  tokenType: 'mockDefault',
};

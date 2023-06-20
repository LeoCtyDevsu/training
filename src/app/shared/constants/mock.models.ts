import { BookModel } from '../models/book.model';
import { CategoryModel } from '../models/category.model';
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

export const mockCategory: CategoryModel = {
  description: 'mockData',
  id: 1,
};

export const mockBook: BookModel = {
  id: 'mockBook',
  title: 'mockBook',
  author: 'mockBook',
  resume: 'mockBook',
  image: 'mockBook',
  url: 'mockBook',
  userRegister: 'mockBook',
  category: [1, 2, 3],
  public: true,
  isbn13: 1,
  price: 'mockBook',
};

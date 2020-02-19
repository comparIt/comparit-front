import {Filter} from './filter';

export class User {
  authdata: User;
  id: number;
  email: string;
  lastName: string;
  firstName: string;
  password: string;
  filters: Filter[];
  company: string[];
  typeUser: string[];
  createdAt: Date;
  updatedAt: Date;
  role: string;

  editing = false;

  static buildUser(user: User): User {
    const newUser = new User();
    newUser.id = user.id;
    newUser.email = user.email;
    newUser.lastName = user.lastName;
    newUser.firstName = user.firstName;
    newUser.password = user.password;
    newUser.role = user.role;
    return newUser;
  }
}

import { inject, injectable } from 'inversify';
import { User } from '../db/models/user.model';
import TYPES from '../constant/types';

// export interface IUser {
//   id?: string | number;
//   fullName?: string;
//   email?: string;
//   role?: Role;
// }

// export interface IUpdateUser {
//   id?: string | number;
//   fullName?: string;
//   email?: string;
//   role?: Role;
// }

@injectable()
export class UserService {
  constructor(@inject(TYPES.User) private userModel: typeof User) {}

  public async getUsers() {
    console.log('----- ', await this.userModel.findAll());
    return await this.userModel.findAll();
  }

  public async getUser(id: number | string) {
    return await this.userModel.findByPk(id);
  }

  public async createUser(userData: any) {
    try {
      const newUser = await this.userModel.create(userData);
      return newUser;
    } catch (error) {
      // Handle error (e.g., duplicate email)
      console.error('Error creating user:', error);
      throw error;
    }
  }

  public async updateUser(id: number | string, updatedData: any) {
    const user = await this.userModel.findByPk(id);
    if (user) {
      await user.update(updatedData);
      return user;
    } else {
      throw new Error('User not found');
    }
  }

  public async deleteUser(id: number | string): Promise<string> {
    const user = await this.userModel.findByPk(id);
    if (user) {
      await user.destroy();
      return 'User deleted successfully';
    } else {
      throw new Error('User not found');
    }
  }
}

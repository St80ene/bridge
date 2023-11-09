import { injectable } from 'inversify';

export interface ILandlord {
  email: string;
  name: string;
}

@injectable()
export class UserService {
  public getUsers() {
    return 'users found';
  }

  public getUser(id: string) {
    return 'user found';
  }

  public newUser() {
    return 'user created';
  }

  public updateUser(id: string) {}

  public deleteUser(id: string): string {
    return 'deleted';
  }
}

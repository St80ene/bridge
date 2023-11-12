import {
  controller,
  httpGet,
  httpPost,
  httpPut,
  httpDelete,
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { Request } from 'express';
import TYPES from '../constant/types';
import { UserService } from '../service/user.service';

@controller('/users')
export class UserController {
  constructor(@inject(TYPES.UserService) private userService: UserService) {}

  @httpGet('/')
  public getUsers() {
    this.userService.getUsers();

    return { status: true };
  }

  @httpGet('/:id')
  public getUser(request: Request) {
    return this.userService.getUser(request.params.id);
  }

  @httpPost('/')
  public newUser(request: Request) {
    return this.userService.createUser(request);
  }

  @httpPut('/:id')
  public updateUser(request: Request) {
    return this.userService.updateUser(request.params.id, request);
  }

  @httpDelete('/:id')
  public deleteUser(request: Request): Promise<string> {
    return this.userService.deleteUser(request.params.id);
  }
}

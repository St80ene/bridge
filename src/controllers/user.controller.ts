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

@controller('/user')
export class LandlordController {
  constructor(@inject(TYPES.UserService) private userService: UserService) {}

  @httpGet('/')
  public getUsers() {
    return this.userService.getUsers();
  }

  @httpGet('/:id')
  public getUser(request: Request) {
    return this.userService.getUser(request.params.id);
  }

  @httpPost('/')
  public newUser(request: Request) {
    return this.userService.newUser();
  }

  @httpPut('/:id')
  public updateUser(request: Request) {
    return this.userService.updateUser(request.params.id);
  }

  @httpDelete('/:id')
  public deleteUser(request: Request): string {
    return this.userService.deleteUser(request.params.id);
  }
}

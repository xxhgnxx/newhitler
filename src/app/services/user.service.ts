//  本地用户列表更新服务 用于维护本地用户列表
import { Injectable } from '@angular/core';
import { User }  from './user';
import { SocketSevice } from './socket.service';



@Injectable()
export class UserService {
  userList: Array<User>;
  // userLsit = getdate();
  yourself: User = new User('_');
  yourHead: string;
  role: string = 'x';


  whoAmI(user: User) {
    this.yourself = user;

  }
  constructor() { }
}

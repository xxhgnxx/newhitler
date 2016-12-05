//  本地用户列表更新服务 用于维护本地用户列表
import { Injectable } from '@angular/core';
import { User }  from './user';
import { SocketSevice } from './socket.service';



@Injectable()
export class UserService {
  userLsit: Array<User>;
  // userLsit = getdate();
  yourself: User;
  userSeat() {
    // this.socketSevice.userSeat();
  }
  joinGame() { }
  whoAmI(name) {
    this.yourself = this.userLsit.filter(t => { return t.name === name; })[0];
  }
  constructor() { }
}

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
  upDataList() {

  }
  constructor() { }

}

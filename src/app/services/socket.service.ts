import { Injectable } from '@angular/core';
// import { UserService } from '../services/user.service';
import * as io from 'socket.io-client';
import { UserService } from '../services/user.service';


class Sth {
  type: string;
  name: string;
  userLsit: Array<string>;
  msg: string;
  data: any;
  constructor(type: string, data?: any) { }
}

@Injectable()
export class SocketSevice {

  socket: any;
  name: string;
  constructor(userService: UserService) {
    this.socket = io.connect('127.0.0.1:81');
    console.log(Date().toString().slice(15, 25), '实例化服务');
    this.socket.on('system', sth => {
      console.log(Date().toString().slice(15, 25), '系统消息', sth);
    });


    this.socket.on('loginSuccess', sth => {
      console.log(Date().toString().slice(15, 25), 'login ok', sth);
      this.setName(sth.name);
    });

    this.socket.on('upDataList', userLsit => {
      console.log(Date().toString().slice(15, 25), '用户列表更新', userLsit);
      userService.userLsit = userLsit;
      console.log(userService.userLsit[0]);
    });

  }

  // 请求类动作
  startGame() {
    this.socket.emit('system', new Sth('gamestart'));

  }






  setName(name) {

    this.name = name;

  }
}

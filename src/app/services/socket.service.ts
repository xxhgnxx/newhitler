import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { UserService } from './user.service';
import { Data } from './data';


@Injectable()
export class SocketSevice {
  socket: any;
  name: string;
  constructor(public userService: UserService) {
    this.socket = io.connect('127.0.0.1:81');
    console.log(Date().toString().slice(15, 25), '实例化socket服务');



    this.socket.on('system', data => {
      switch (data.type) {
        case 'loginSuccess':
          {
            console.log(Date().toString().slice(15, 25), 'login ok', data.name);
            this.setName(data.name);
            console.log('检查userlist内容', data.userLsit);
            userService.userLsit = data.userLsit;
            break;
          }
        case 'logout':
          {
            console.log(Date().toString().slice(15, 25), data.msg);
            this.setName(data.name);
            userService.userLsit = data.userLsit;
            break;
          }
        case 'gamestart':
          {
            console.log(Date().toString().slice(15, 25), data.msg);
            break;
          }
        default:
          {
            console.log(Date().toString().slice(15, 25), '神秘的未定义请求');
          }
      }
    });




  }

  // 游戏开始
  startGame() {
    let dataOut = new Data();
    dataOut.type = 'gamestart';
    this.socket.emit('system', dataOut);
  }

  // 玩家准备
  userSeat() {
    let dataOut = new Data();
    dataOut.name = this.name;
    dataOut.type = 'userSeat';
    this.socket.emit('system', dataOut);
  }




  setName(name) {

    this.userService = name;

  }
}

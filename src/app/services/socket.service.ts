import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { UserService } from './user.service';
import { Data } from './data';
import { TheGameService } from './game.service';


@Injectable()
export class SocketSevice {
  socket: any;
  name: string;
  constructor(public userService: UserService) {
    this.socket = io.connect('127.0.0.1:81');
    console.log(Date().toString().slice(15, 25), '实例化socket服务');



    this.socket.on('system', data => {
      console.log('收到服务端发来的system请求', data);
      userService.userLsit = data.userLsit;
      switch (data.type) {
        case 'loginSuccess':

          this.userService.whoAmI(name);

          break;
        case 'logout':

          break;
        case 'userSeat':


          break;
        case 'gamestart':


          break;
        default:
          console.log(Date().toString().slice(15, 25), '神秘的未定义请求');
      }
    });




  }

  // 游戏开始
  startGame() {
    let dataOut = new Data();
    dataOut.type = 'gamestart';
    this.socket.emit('system', dataOut);
  }

  login(name: string) {
    let dataOut = new Data();
    dataOut.type = 'login';
    dataOut.name = name;
    this.socket.emit('system', dataOut);
  }
  // 玩家准备
  userSeat() {
    let dataOut = new Data();
    dataOut.name = this.name;
    dataOut.type = 'userSeat';
    this.socket.emit('system', dataOut);
  }




  whoAmI(name) {



  }
}

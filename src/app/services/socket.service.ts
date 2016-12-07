import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { UserService } from './user.service';
import { Data } from './data';
import { TheGameService } from './game.service';
import { Vote } from './vote';
import { NetworkSocket } from './network';

@Injectable()
export class SocketSevice {
  networkSocket: NetworkSocket;
  name: string;

  // 游戏开始
  startGame(): void {
    let dataOut = new Data();
    dataOut.type = 'gamestart';
    this.networkSocket.send(dataOut, x => { return x; });
  }

  login(name: string, cb) {
    console.log(this.userService.ttt);
    let dataOut = new Data();
    dataOut.type = 'login';
    dataOut.name = name;
    this.networkSocket.send(dataOut, cb);
  }
  // 玩家准备
  userSeat() {
    let dataOut = new Data();
    dataOut.name = this.name;
    dataOut.type = 'userSeat';
    this.networkSocket.send(dataOut, x => { return x; });
  }


  system(data) {
    console.log('收到服务端发来的system请求', data);
    this.userService.userList = data.userList;
    switch (data.type) {
      case 'loginSuccess':
        this.userService.whoAmI(data.user);
        console.log(data.userList);
        break;
      case 'logout':

        break;
      case 'userSeat':


        break;
      case 'gamestart':
        console.log(this.userService.userList);
        this.userService.whoAmI(this.userService.userList.filter(t => {
          return t.socketId === this.userService.yourself.socketId;
        })[0]);
        this.loadData(data);
        break;
      default:
        console.log(Date().toString().slice(15, 25), '神秘的未定义请求');
    }
  }


  // 数据包处理
  loadData(data: Data) {
    let msg = '';

    if (data.proIndex) {
      this.theGameService.proIndex = data.proIndex;
      msg = msg + ' ' + 'proIndex';
    }
    if (data.voteList) {
      this.theGameService.voteList = data.voteList;
      msg = msg + ' ' + 'voteList';
    }
    if (data.proList) {
      this.theGameService.proList = data.proList;
      msg = msg + ' ' + 'proList';
    }
    if (data.started) {
      this.theGameService.started = data.started;
      msg = msg + ' ' + 'started';
    }
    if (data.proEffBlue) {
      this.theGameService.proEffBlue = data.proEffBlue;
      msg = msg + ' ' + 'proEffBlue';
    }
    if (data.proEffRed) {
      this.theGameService.proEffRed = data.proEffRed;
      msg = msg + ' ' + 'proIndex';
    }
    if (data.failTimes) {
      this.theGameService.failTimes = data.failTimes;
      msg = msg + ' ' + 'failTimes';
    }
    if (data.fascistCount) {
      this.theGameService.fascistCount = data.fascistCount;
      msg = msg + ' ' + 'fascistCount';
    }
    if (data.liberalCount) {
      this.theGameService.liberalCount = data.liberalCount;
      msg = msg + ' ' + 'liberalCount';
    }
    if (data.lastPre) {
      this.theGameService.lastPre = data.lastPre;
      msg = msg + ' ' + 'lastPre';
    }
    if (data.lastPrm) {
      this.theGameService.lastPrm = data.lastPrm;
      msg = msg + ' ' + 'lastPrm';
    }
    if (data.pre) {
      this.theGameService.pre = data.pre;
      msg = msg + ' ' + 'pre';
    }
    if (data.prenext) {
      this.theGameService.prenext = data.prenext;
      msg = msg + ' ' + 'prenext';
    }
    if (data.prm) {
      this.theGameService.prm = data.prm;
      msg = msg + ' ' + 'prm';
    }
    console.log('数据读取', msg);
  }

  constructor(public userService: UserService, public theGameService: TheGameService) {
    this.networkSocket = new NetworkSocket();
    this.networkSocket.start(io.connect('127.0.0.1:81'), this.system.bind(this));
    console.log(Date().toString().slice(15, 25), '实例化socket服务');
  }





}

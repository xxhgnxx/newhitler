import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { UserService } from './user.service';
import { Data } from './data';
import { TheGameService } from './game.service';
import { Vote } from './vote';
import { NetworkSocket } from './network';
import { User } from './user';

@Injectable()
export class SocketSevice {
  networkSocket: NetworkSocket;
  name: string;

  // 游戏开始
  startGame(): void {
    let dataOut = new Data();
    dataOut.type = 'gamestart';
    this.networkSocket.send(dataOut, x => { console.log(x); });
  }

  login(name: string, cb) {

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
    this.networkSocket.send(dataOut, x => { console.log(x); });
  }
  // 选择总理
  prmSelect(user: User) {
    let dataOut = new Data();
    dataOut.user = user;
    dataOut.type = 'prmSelect';
    this.networkSocket.send(dataOut, x => { console.log(x); });

  }

  // 送出投票
  vote(n: number) {
    let dataOut = new Data();
    dataOut.voteRes = n;
    dataOut.type = 'vote';
    this.networkSocket.send(dataOut, x => { console.log(x); });

  }

  system(data) {
    console.log('收到服务端发来的system请求', data);
    this.loadData(data);
    this.userService.userList = data.userList;
    switch (data.type) {
      case 'loginSuccess':
        this.userService.whoAmI(data.user);

        break;
      case 'logout':

        break;
      case 'userSeat':


        break;

      case 'gamestart':

        this.userService.whoAmI(this.userService.userList.filter(t => {
          return t.socketId === this.userService.yourself.socketId;
        })[0]);

        break;

      case 'selectPrm':
        console.log(data.type);
        if (this.userService.yourself.socketId === data.pre.socketId) {
          this.theGameService.toDoSth = '选总理';
        } else {
          this.theGameService.toDoSth = '等待' + data.pre.name + '选总理';
        }

        break;
      case 'pleaseVote':
        console.log(data.type);
        if (data.voteRes) {
          let tmp = '';
          if (data.voteRes > this.theGameService.nowVote.length / 2) {
            tmp = '组建成功';
          } else {
            tmp = '组建失败';
          }
          this.theGameService.toDoSth = tmp;
          this.theGameService.isVoted = false;
        } else {
          this.theGameService.toDoSth = '投票';
        }
        console.log('是否已经投过票', this.theGameService.isVoted);
        break;


      case 'choosePro':
        console.log(data.type);


        break;


      default:
        console.log(Date().toString().slice(15, 25), '神秘的未定义请求');
    }
  }


  // 数据包处理
  loadData(data: Data) {
    let msg = '';

    if (typeof data.proIndex !== 'undefined') {
      this.theGameService.proIndex = data.proIndex;
      msg = msg + ' ' + 'proIndex';
    }
    if (typeof data.nowVote !== 'undefined') {

      this.theGameService.nowVote = data.nowVote;
      msg = msg + ' ' + 'nowVote';
    }
    if (typeof data.voteCount !== 'undefined') {
      this.theGameService.voteCount = data.voteCount;
      msg = msg + ' ' + 'voteCount';
    }
    if (typeof data.proList !== 'undefined') {
      this.theGameService.proList = data.proList;
      msg = msg + ' ' + 'proList';
    }
    if (typeof data.started !== 'undefined') {
      this.theGameService.started = data.started;
      msg = msg + ' ' + 'started';
    }
    if (typeof data.proEffBlue !== 'undefined') {
      this.theGameService.proEffBlue = data.proEffBlue;
      msg = msg + ' ' + 'proEffBlue';
    }
    if (typeof data.proEffRed !== 'undefined') {
      this.theGameService.proEffRed = data.proEffRed;
      msg = msg + ' ' + 'proIndex';
    }
    if (typeof data.failTimes !== 'undefined') {
      this.theGameService.failTimes = data.failTimes;
      msg = msg + ' ' + 'failTimes';
    }
    if (typeof data.fascistCount !== 'undefined') {
      this.theGameService.fascistCount = data.fascistCount;
      msg = msg + ' ' + 'fascistCount';
    }
    if (typeof data.liberalCount !== 'undefined') {
      this.theGameService.liberalCount = data.liberalCount;
      msg = msg + ' ' + 'liberalCount';
    }
    if (typeof data.lastPre !== 'undefined') {
      this.theGameService.lastPre = data.lastPre;
      msg = msg + ' ' + 'lastPre';
    }
    if (typeof data.lastPrm !== 'undefined') {
      this.theGameService.lastPrm = data.lastPrm;
      msg = msg + ' ' + 'lastPrm';
    }
    if (typeof data.pre !== 'undefined') {
      this.theGameService.pre = data.pre;
      msg = msg + ' ' + 'pre';
    }
    if (typeof data.prenext !== 'undefined') {
      this.theGameService.prenext = data.prenext;
      msg = msg + ' ' + 'prenext';
    }
    if (typeof data.prm !== 'undefined') {
      this.theGameService.prm = data.prm;
      msg = msg + ' ' + 'prm';
    }
    if (typeof data.playerList !== 'undefined') {
      this.theGameService.playerList = data.playerList;
      msg = msg + ' ' + 'playerList';
    }
    if (typeof data.proX3List !== 'undefined') {
      this.theGameService.proX3List = data.proX3List;
      msg = msg + ' ' + 'proX3List';
    }
    console.log('数据读取', msg);
  }

  constructor(public userService: UserService, public theGameService: TheGameService) {
    this.networkSocket = new NetworkSocket();
    this.networkSocket.start(io.connect('127.0.0.1:81'), this.system.bind(this));
    console.log(Date().toString().slice(15, 25), '实例化socket服务');
  }





}

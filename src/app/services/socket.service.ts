import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { UserService } from './user.service';
import { Data } from './data';
import { dataLoader } from './data';
import { TheGameService } from './game.service';
import { Vote } from './vote';
import { NetworkSocket } from './network';
import { User } from './user';
import { TheMsgService } from './msg.service';
import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { myEmitter } from '../services';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Injectable()
export class SocketSevice {
  networkSocket: NetworkSocket;

  name: string;
  inited = false;
  @Output() speakNow: EventEmitter<any> = new EventEmitter();
  @Output() speakEnd: EventEmitter<any> = new EventEmitter();
  @Output() quickloginResult: EventEmitter<any> = new EventEmitter();
  @Output() loginResult: EventEmitter<any> = new EventEmitter();


  // 游戏开始
  startGame(): void {
    let dataOut = new Data();
    dataOut.type = 'gamestart';
    this.networkSocket.send(dataOut, x => { console.log(x); });
  }

  // 登陆
  async  login(name: string, pass: string) {
    let dataOut = new Data();
    dataOut.type = 'login';
    dataOut.name = name;
    dataOut.pass = pass;
    // this.userService.yourself.socketId = this.networkSocket.getId();
    if (typeof this.networkSocket !== 'undefined') {
      this.networkSocket.send(dataOut, x => { console.log(x); });
    } else {
      this.networkSocket = new NetworkSocket();
      let networkstatus = await this.networkSocket.start();
      if (networkstatus) {
        this.userService.yourself.socketId = networkstatus;
        this.networkSocket.socketOn(this.system.bind(this));
        this.networkSocket.send(dataOut, x => { console.log(x); });
      } else {
        this.loginResult.emit('链接服务器失败');
      }
    }
  }

  // 快速登陆
  async  quickLogin(id: string) {
    let dataOut = new Data();
    dataOut.type = 'quickLogin';
    dataOut.id = id;
    if (typeof this.networkSocket !== 'undefined') {
      this.networkSocket.send(dataOut, x => { console.log(x); });
    } else {
      this.networkSocket = new NetworkSocket();
      let networkstatus = await this.networkSocket.start();
      if (networkstatus) {
        this.userService.yourself.socketId = networkstatus;
        this.networkSocket.socketOn(this.system.bind(this));
        this.networkSocket.send(dataOut, x => { console.log(x); });
      } else {
        this.loginResult.emit('链接服务器失败');
      }
    }

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
  //  选总统
  preSelect(user: User) {

    let dataOut = new Data();
    dataOut.user = user;
    dataOut.type = 'preSelect';
    this.networkSocket.send(dataOut, x => { console.log(x); });
  }
  // 枪决
  toKill(user: User) {
    let dataOut = new Data();
    dataOut.target = user;
    dataOut.type = 'toKill';
    this.networkSocket.send(dataOut, x => { console.log(x); });
  }
  // 送出投票
  vote(n: number) {
    let dataOut = new Data();
    dataOut.voteRes = n;
    dataOut.type = 'vote';
    this.networkSocket.send(dataOut, x => { console.log(x); });

  }

  // 选法案
  proSelect(pro) {
    let dataOut = new Data();
    dataOut.type = 'proSelect';
    dataOut.proX3List = this.theGameService.proX3List;
    dataOut.pro = pro;
    this.networkSocket.send(dataOut, x => { console.log(x); });
  }
  // 调查身份
  invPlayer(player: User) {
    let dataOut = new Data();
    dataOut.type = 'invPlayer';
    dataOut.target = player;
    this.networkSocket.send(dataOut, x => { console.log(x); });
  }
  // 调查身份
  speak_end() {
    let dataOut = new Data();
    dataOut.type = 'speak_end';
    this.networkSocket.send(dataOut, x => { console.log(x); });
  }



  //  文字发言
  sendMsg(msg: string) {
    let dataOut = new Data();
    dataOut.type = 'sendMsg';
    dataOut.msg = msg;
    this.networkSocket.send(dataOut, x => { console.log(x); });
  }

  // 否决全部法案
  veto() {
    let dataOut = new Data();
    dataOut.type = 'veto_all';
    this.networkSocket.send(dataOut, x => { console.log(x); });

  }

  // 总统否决权
  veto_all(n: number) {
    let dataOut = new Data();
    dataOut.type = 'veto_all';
    dataOut.other = n;
    this.networkSocket.send(dataOut, x => { console.log(x); });

  }

  system(data) {
    console.log('%c收到服务端发来的system请求', 'background: #222; color: #bada55', data);
    dataLoader(this.userService, this.theGameService, this.theMsgService, data);
    switch (data.type) {
      case 'loginSuccess':
        this.loginResult.emit('认证成功');
        break;

      case 'quickloginSuccess':
        this.quickloginResult.emit('认证成功');

        break;
      case 'Login_fail':
        this.loginResult.emit('认证失败');
        // myEmitter.emit('user_login_passWrong');
        break;
      case 'quickLogin_fail':
        this.quickloginResult.emit('认证失败');
        // myEmitter.emit('user_login_passWrong');
        break;


      case 'logout':

        break;
      case 'userSeat':


        break;

      case 'gamestart':



        break;
      case 'someone_speak_end':


        break;

      case 'newPlayerSpeak':
        let newMsg = new Array<any>();
        this.theMsgService.msgListAll.push(newMsg);
        this.theMsgService.msgListNow = newMsg;
        let whoString = '现在是 ';
        if (data.whoIsSpeaking.isPre) {
          whoString = whoString + '总统 ' + data.whoIsSpeaking.name + ' 在发言';
        }
        if (data.whoIsSpeaking.isPrm) {
          whoString = whoString + '总理 ' + data.whoIsSpeaking.name + ' 在发言';
        }
        if (!data.whoIsSpeaking.isPrm && !data.whoIsSpeaking.isPre) {
          whoString = whoString + '议员 ' + data.whoIsSpeaking.name + ' 在发言';
        }

        this.theMsgService.msgListNow.push(whoString);

        if (this.userService.yourself.socketId === data.whoIsSpeaking.socketId) {
          this.speakNow.emit(data.speakTime);
        } else {
          console.log('别人发言');
          this.speakEnd.emit('end');
        }
        this.theGameService.toDoSth = '顺序发言中';

        break;

      case 'role':
        this.userService.setTeam(data);

        break;
      case 'proEff':
        console.log(data.pro > 5 ? '红色法案生效' : '蓝色法案生效');
        break;
      case 'invPlayer':
        console.log('调查身份');
        if (typeof data.other !== 'undefined') {
          this.theGameService.toDoSth = '调查身份结果';
        } else {
          if (this.userService.yourself.socketId === this.theGameService.pre.socketId) {
            this.theGameService.toDoSth = '调查身份';
          } else {
            this.theGameService.toDoSth = '等待' + this.theGameService.pre.name + '调查身份';
          }
        }
        break;

      case 'selectPrm':
        if (this.userService.yourself.socketId === data.pre.socketId) {
          this.theGameService.toDoSth = '选总理';
        } else {
          this.theGameService.toDoSth = '等待' + data.pre.name + '选总理';
        }

        break;
      case 'pleaseVote':

        if (typeof data.voteRes !== 'undefined') {
          if (data.voteRes) {
            console.log('成功');
          } else {
            console.log('失败');
          }
          this.theGameService.isVoted = false;
        } else {
          this.theGameService.toDoSth = '投票';
        }
        break;

      case 'choosePro':

        this.theGameService.toDoSth = '等待选法案';
        if (typeof data.proX3List !== 'undefined') {
          this.theGameService.toDoSth = '选法案';
        }
        break;

      case 'choosePro2':

        this.theGameService.toDoSth = '等待选法案,可否决状态';
        if (typeof data.proX3List !== 'undefined') {
          this.theGameService.toDoSth = '选法案2';
        }

        break;
      case 'veto_all':
        console.log(this.userService.yourself);
        if (typeof data.other === 'undefined') {
          this.theGameService.toDoSth = '等待总统是否同意否决全部';
          if (this.userService.yourself.isPre) {
            this.theGameService.toDoSth = '总统是否同意否决全部';
          }
        } else {

          this.theGameService.toDoSth = '总统反对否决全部，等待总理选法案';
          if (this.userService.yourself.isPrm) {
            this.theGameService.toDoSth = '选法案';
          }

        }

        break;


      case 'toKill':

        if (this.userService.yourself.socketId === this.theGameService.pre.socketId) {
          this.theGameService.toDoSth = '枪决';
        } else {
          this.theGameService.toDoSth = '等待' + this.theGameService.pre.name + '枪决';
        }

        break;
      case 'preSelect':

        if (this.userService.yourself.socketId === this.theGameService.pre.socketId) {
          this.theGameService.toDoSth = '选总统';
        } else {
          this.theGameService.toDoSth = '等待' + this.theGameService.pre.name + '选总统';
        }
        break;
      case 'gameover':

        this.theGameService.toDoSth = data.other;
        break;

      case 'msg':
        if (typeof data.whoIsSpeaking !== 'undefined'
          && this.userService.yourself.socketId === data.whoIsSpeaking.socketId) {
          this.speakNow.emit(data.speakTime);
        } else {
          console.log('别人发言');
          this.speakEnd.emit('end');
        }
        this.theGameService.toDoSth = '顺序发言中';
        break;




      default:
        console.log(Date().toString().slice(15, 25), '神秘的未定义请求');
    }
  }





  constructor(
    private router: Router,
    public userService: UserService,
    public theGameService: TheGameService,
    public theMsgService: TheMsgService) {

  }





  async start() {
    this.networkSocket = new NetworkSocket();

    // this.networkSocket.start()
    //
    let networkstatus = await this.networkSocket.start();
    if (networkstatus) {
      this.userService.yourself.socketId = networkstatus;
      this.networkSocket.socketOn(this.system.bind(this));
      return true;
    } else {
      return false;
    }
  }

}

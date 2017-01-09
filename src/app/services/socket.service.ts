import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { UserService } from './user.service';
import { Data } from './data';
import { Msg } from './data';
import { dataLoader } from './data';
import { TheGameService } from './game.service';
import { Vote } from './vote';
import { NetworkSocket } from './network';
import { User } from './user';
import { TheMsgService } from './msg.service';
import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
let yaml = require('js-yaml');

@Injectable()
export class SocketSevice {
  networkSocket: NetworkSocket;

  name: string;
  inited = false;
  @Output() speakNow: EventEmitter<any> = new EventEmitter();
  @Output() speakEnd: EventEmitter<any> = new EventEmitter();
  @Output() quickloginResult: EventEmitter<any> = new EventEmitter();
  @Output() loginResult: EventEmitter<any> = new EventEmitter();
  @Output() otherPlayerTimer: EventEmitter<any> = new EventEmitter();


  // 游戏开始
  startGame(): void {
    let dataOut = new Data('gamestart');
    this.networkSocket.send(dataOut, x => { console.log(x); });
  }

  // 登陆
  async  login(name: string, pass: string) {
    let dataOut = new Data('login');
    dataOut.name = name;
    dataOut.pass = pass;
    // this.userService.yourself.socketId = this.networkSocket.getId();
    if (typeof this.networkSocket !== 'undefined' && this.networkSocket.isOnline()) {
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
    let dataOut = new Data('quickLogin');
    dataOut.id = id;
    if (typeof this.networkSocket !== 'undefined' && this.networkSocket.isOnline()) {
      this.networkSocket.send(dataOut, x => { console.log(x); });
    } else {
      this.networkSocket = new NetworkSocket();
      let networkstatus = await this.networkSocket.start();
      if (networkstatus) {
        this.userService.yourself.socketId = networkstatus;
        this.networkSocket.socketOn(this.system.bind(this));
        this.networkSocket.send(dataOut, x => { console.log(x); });
      } else {
        this.quickloginResult.emit('链接服务器失败');
      }
    }

  }


  // 玩家准备
  userSeat() {
    let dataOut = new Data('userSeat');
    dataOut.name = this.name;
    this.networkSocket.send(dataOut, x => { console.log(x); });
  }
  // 选择总理
  prmSelect(user: User) {
    let dataOut = new Data('prmSelect');
    dataOut.user = user;
    this.networkSocket.send(dataOut, x => { console.log(x); });
  }
  //  选总统
  preSelect(user: User) {

    let dataOut = new Data('preSelect');
    dataOut.user = user;
    this.networkSocket.send(dataOut, x => { console.log(x); });
  }
  // 枪决
  toKill(user: User) {
    let dataOut = new Data('toKill');
    dataOut.target = user;
    this.networkSocket.send(dataOut, x => { console.log(x); });
  }
  // 送出投票
  vote(n: number) {
    let dataOut = new Data('player_vote');
    dataOut.voteRes = n;
    this.networkSocket.send(dataOut, x => { console.log(x); });

  }

  // 选法案
  proSelect(list, pro) {
    let dataOut = new Data('proSelect');
    dataOut.proX3List = list;
    dataOut.pro = pro;
    this.networkSocket.send(dataOut, x => { console.log(x); });
  }
  // 调查身份
  invPlayer(player: User) {
    let dataOut = new Data('invPlayer');
    dataOut.target = player;
    this.networkSocket.send(dataOut, x => { console.log(x); });
  }
  //
  speak_end() {
    let dataOut = new Data('speak_end');
    this.networkSocket.send(dataOut, x => { console.log(x); });
  }



  //  文字发言
  sendMsg(msg: string) {
    let dataOut = new Data('sendMsg');
    dataOut.msg = new Msg(this.userService.yourself, msg);
    this.networkSocket.send(dataOut, x => { console.log(x); });
  }

  // 否决全部法案
  veto() {
    let dataOut = new Data('veto_all');
    this.networkSocket.send(dataOut, x => { console.log(x); });

  }

  // 总统否决权
  veto_all(n: number) {
    let dataOut = new Data('veto_all');
    dataOut.other = n;
    this.networkSocket.send(dataOut, x => { console.log(x); });

  }

  system(data) {
    console.log('%csystem', 'background: #93ADAA; color: #000', data);
    if (data.type === 'Push_msg') {
      console.log('%cPush_msg', 'background: #E99B49; color: #000', data);
      this.theMsgService.msgList.push(data.msg);
      // sessionStorage.setItem('mymsglist', yaml.safeDump(this.theMsgService.msgList));
    }
    if (data.type === 'Updata_msg') {
      console.log('%cUpdata_msg', 'background: #CCC78A; color: #000', data);
      this.theMsgService.msgList.pop();
      this.theMsgService.msgList.push(data.msg);
      // sessionStorage.setItem('mymsglist', yaml.safeDump(this.theMsgService.msgList));
    }

    if (data.type === 'show_msg') {
      console.log('%cshow_msg', 'background: #CCC78A; color: #000', data);
      this.theMsgService.msgList = data.msgList;
      // sessionStorage.setItem('mymsglist', yaml.safeDump(this.theMsgService.msgList));
    }


    dataLoader(this.userService, this.theGameService, this.theMsgService, data);

    switch (data.type) {
      case 'dis':
        this.router.navigate(['/login']);
        sessionStorage.removeItem('login');
        this.disconnect();
        this.userService.isLogin = false;
        this.loginResult.emit('被顶替');
        alert('有人顶替了您');
        break;

      case 'loginSuccess':
        this.loginResult.emit('认证成功');
        break;

      case 'quickloginSuccess':
        this.quickloginResult.emit('认证成功');

        break;
      case 'Login_fail':
        this.userService.other = data.other;
        this.loginResult.emit('认证失败');
        // myEmitter.emit('user_login_passWrong');
        break;
      case 'quickLogin_fail':
        this.quickloginResult.emit('认证失败');
        // myEmitter.emit('user_login_passWrong');
        break;
      case 'updata':
        break;
      case 'gamestart':
        sessionStorage.removeItem('mymsglist');
        this.theMsgService.msgList = [];
        break;
      case 'logout':
        break;
      case 'userSeat':
        break;

      case 'role':
        this.userService.setTeam(data);
        break;


      case 'toLookPro':
        this.userService.teamMsg = this.userService.teamMsg + '  法案牌，从上到下依次为：';
        for (let i = 0; i < data.proX3List.length; i++) {
          if (data.proX3List[i] <= 5) {
            this.userService.teamMsg = this.userService.teamMsg + '蓝色、';
          } else {
            this.userService.teamMsg = this.userService.teamMsg + '红色、';
          }
        }
        this.theMsgService.msgListAll.push(new Msg('control', '技能：查看法案'));
        break;
      case 'someone_speak_end':
        this.theMsgService.msgListAll[this.theMsgService.msgListAll.length - 1].other = false;
        break;
      // todo
      case 'newPlayerSpeak':
        let newMsg = new Msg(data.whoIsSpeaking, new Array(), true);
        this.theMsgService.msgListAll.push(newMsg);
        // this.theMsgService.msgListNow = newMsg;
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



        if (this.userService.yourself.socketId === data.whoIsSpeaking.socketId) {
          this.speakNow.emit(data.speakTime);
        } else {
          console.log('别人发言');
          this.speakEnd.emit('end');
        }
        this.theGameService.toDoSth = data.whoIsSpeaking.name + '发言中...';

        break;

      case 'speak_endAll':
        this.speakEnd.emit('end');
        break;

      case 'proEff':
        console.log(data.pro > 5 ? '红色法案生效' : '蓝色法案生效');
        break;

      case 'invPlayer':
        console.log('调查身份');
        if (typeof data.other !== 'undefined') {
          this.theGameService.toDoSth = '调查身份结果';
          this.theMsgService.msgListAll.push(new Msg('control', '技能：调查身份--结果'));
        } else {
          this.theMsgService.msgListAll.push(new Msg('control', '发动技能：调查身份'));
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
        // this.theMsgService.msgListAll.push(new Msg('control', '选总理'));

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
        // this.theMsgService.msgListAll.push(new Msg('control', '投票'));

        break;

      case 'choosePro':
        // this.theMsgService.msgListAll.push(new Msg('control', '等待选法案'));
        //  todo  区分谁在选
        this.theGameService.toDoSth = '等待选法案';
        if (typeof data.proX3List !== 'undefined') {
          this.theGameService.toDoSth = '选法案';
        }



        break;

      case 'choosePro2':
        // this.theMsgService.msgListAll.push(new Msg('control', '等待选法案,可否决状态'));
        //  todo  区分谁在选
        this.theGameService.toDoSth = '等待选法案,可否决状态';
        if (typeof data.proX3List !== 'undefined') {
          this.theGameService.toDoSth = '选法案2';
        }



        break;
      case 'veto_all':
        // this.theMsgService.msgListAll.push(new Msg('control', '等待总统是否同意否决全部'));

        console.log(this.userService.yourself);
        if (typeof data.other === 'undefined') {
          this.theGameService.toDoSth = '等待总统是否同意否决全部';

          if (this.userService.yourself.isPre) {
            this.theGameService.toDoSth = '是否同意否决全部';
          }
        } else {

          this.theGameService.toDoSth = '总统反对否决全部，等待总理选法案';

          if (this.userService.yourself.isPrm) {
            this.theGameService.toDoSth = '选法案';
          }

        }

        break;


      case 'toKill':
        this.theMsgService.msgListAll.push(new Msg('control', '发动技能：枪决'));

        if (this.userService.yourself.socketId === this.theGameService.pre.socketId) {
          this.theGameService.toDoSth = '枪决';

        } else {
          this.theGameService.toDoSth = '等待' + this.theGameService.pre.name + '枪决';
        }

        break;
      case 'preSelect':
        this.theMsgService.msgListAll.push(new Msg('control', '发动技能：指定'));

        if (this.userService.yourself.socketId === this.theGameService.pre.socketId) {
          this.theGameService.toDoSth = '选总统';
        } else {
          this.theGameService.toDoSth = '等待' + this.theGameService.pre.name + '选总统';
        }
        break;
      case 'gameover':
        this.theMsgService.msgListAll.push(new Msg('system', '游戏结束'));

        this.theGameService.toDoSth = data.other;


        break;

      case 'msg':
        //  todo
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
        console.log(Date().toString().slice(15, 25), '未定义请求');


    }
  }





  constructor(
    private router: Router,
    public userService: UserService,
    public theGameService: TheGameService,
    public theMsgService: TheMsgService) {

  }


  disconnect() {
    this.networkSocket.disconnect();
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

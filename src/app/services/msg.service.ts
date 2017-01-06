import { Injectable } from '@angular/core';
// import { UserService } from '../services/user.service';
import * as io from 'socket.io-client';
import { UserService } from '../services/user.service';
import { GameControlComponent } from '../gameControl/gameControl.component';
import { User } from './user';

@Injectable()
export class TheMsgService {

  msgList = new Array<any>();
  msgListAll = new Array<any>();
  msgListNow = new Array<any>();
  locked: boolean;  // 禁止发言
  speakTime: number;  // 发言时间
  msgFrom: User | string;   // 消息来源  用户 或者 系统(string)
  whoSpeaking: User;
  msg: string;     // msg内容

  controlNow: any;
  timing(time: number) { }
}


class MsgContainer {
  msgFrom = new User('system');
  msgType = 'string';
  msgbady: any;




  constructor(who: User, type: string, msgbady: any) {
    this.msgFrom = who;
    this.msgType = type;
  }

}

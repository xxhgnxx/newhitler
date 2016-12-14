import { User } from './user';
import { Data } from './data';
import { UserService } from './userService';



export class MsgData  {
  type: string;
  toWho: Array<User> | User;
  locked: boolean;  // 禁止发言
  speakTime: number;  // 发言时间
  msgFrom: User | string;   // 消息来源  用户 或者 系统(string)

  msgListAll: Array<any>;  // 完整的消息记录

  msg: string;     // msg内容

  constructor() {
    this.type = 'msg';
  }
}

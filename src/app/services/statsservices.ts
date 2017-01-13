import { Injectable } from '@angular/core';
import { User } from './user';
import { Vote } from './vote';

@Injectable()
export class StatsServices {
  skillList = new Array<Function | string>();  // 技能列表
  skillnamelist = new Array<string>();
  started: boolean = false;       // 游戏是否开始
  gametype: number;
  fascistCount: number; // 法西斯玩家数量
  liberalCount: number; // 自由党玩家数量

  proList = new Array<any>();  // 法案牌堆
  proIndex = 16; // 牌堆顶
  proX3List = new Array<any>(); // 法案牌摸的三张牌
  proEffBlue = 0; // 法案生效数
  proEffRed = 0; // 法案生效数

  isVoted: boolean = false;
  voteList: Array<any>; // 投票总记录
  nowVote = new Array<number>(); // 当前正在进行的投票
  voteRes: number; // 投票结果
  voteCount: number;  //  投票数量

  failTimes = 0; // 政府组件失败次数

  lastPre: User;
  lastPrm: User;
  pre: User;
  prenext: User;
  prm: User;
  prmTmp: User;
  hitler: User;

  fascist: Array<User>;
  liberal: Array<User>;
  toDoSth: string = '';

  target: User;  //  收到影响的玩家 临时变量

  // 其他
  spking = false; // 现在是否是你在发言

  gameMsg = [];
  speakTime = 120;

  msgList = new Array<any>();
  msgListAll = new Array<any>();
  msgListNow = new Array<any>();
  locked: boolean;  // 禁止发言
  msgFrom: User | string;   // 消息来源  用户 或者 系统(string)
  whoSpeaking: User;
  msg: string;     // msg内容

  controlNow: any;

  hList = new Userlisthgn(); // 系统用户总表存储位置
  userList: Array<User>;
  // userLsit = getdate();
  yourself: User = new User('x');
  yourHead: string;
  role: string = 'x';
  teamMsg = '游戏尚未开始';
  isLogin = false;
  other = 'what? 出Bug啦！';

  constructor() { }

}

class Userlisthgn {
  userList = new Array<User>();
  playerList = new Array<User>();
  yourself: User;
}

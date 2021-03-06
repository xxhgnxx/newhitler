import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { SocketSevice } from './socket.service';
import { User } from './user';
import { Vote } from './vote';


@Injectable()
export class TheGameService {
  skillList = new Array<Function | string>();  // 技能列表
  skillnamelist = new Array<string>();
  started: boolean = false;       // 游戏是否开始
  gametype: number;
  fascistCount: number; // 法西斯玩家数量
  liberalCount: number; // 自由党玩家数量
  isgameover = false;
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
  other: any;
  locked = false;

  gameMsg = [];
  speakTime = 120;
  constructor() { }
}  // 游戏状态，是否开始，影响到能否加入游戏等

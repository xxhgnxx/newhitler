import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { SocketSevice } from './socket.service';
import { User } from './user';

@Injectable()
export class TheGameService {
  skillList = new Array<Function | string>();  // 技能列表
  proList = new Array<any>();  // 法案牌堆
  started: boolean = false;       // 游戏是否开始
  playerList: Array<User>; // 加入本次游戏的玩家列表，主要用于消息发送
  proIndex = 16; // 牌堆顶
  proEffBlue = 0; // 法案生效数
  proEffRed = 0; // 法案生效数
  failTimes = 0; // 政府组件失败次数
  fascistCount: number; // 法西斯玩家数量
  liberalCount: number; // 自由党玩家数量
  voteCount: number; // 投票数
  voteYes: number; // 投票数
  lastPre: User;
  lastPrm: User;
  pre: User;
  prenext: User;
  prm: User;
  hitler: User;
  fascist: Array<User>;
  ziyoudang: Array<User>;
  constructor() { }
}  // 游戏状态，是否开始，影响到能否加入游戏等

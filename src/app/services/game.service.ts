import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { SocketSevice } from './socket.service';
import { User } from './user';

@Injectable()
export class TheGameService {
  started: boolean;       // 游戏是否开始
  userList: Array<User>; // 加入本次游戏的玩家列表，主要用于消息发送
  skillList = []; // 技能列表
  proIndex = 16; // 牌堆顶
  proEffBlue = 0; // 法案生效数
  proEffRed = 0; // 法案生效数
  failTimes = 0; // 政府组件失败次数
  lastPre: User;
  lastPrm: User;
  pre: User;
  prm: User;
  hitler: User;
  fascist: Array<User>;
  ziyoudang: Array<User>;

  setPlayer() { }
  setGame() { }
  setPro() { }
  Shuffle() { }
  setPre() { }
  setPrm() { }
  effPro() { }
  vote() { }
  preSelect() { }
  prmSelect() { }
  proSelect() { }
  tmp() { }
  back() { }
  gameOver() { }
  constructor(public userService: UserService, public socketSevice: SocketSevice)
  { this.userList = userService.userLsit; }

  startGame() {
    this.socketSevice.startGame();
  }
}  // 游戏状态，是否开始，影响到能否加入游戏等

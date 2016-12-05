import { Component } from '@angular/core';

import { User } from '../services';
import { UserService } from '../services';
import { TheGameService } from '../services';
import { SocketSevice } from '../services';

@Component({

  selector: 'gameControl',
  styleUrls: ['gameControl.component.css'],
  templateUrl: 'gameControl.component.html'

})
export class GameControlComponent {
  proList: Array<number> = [0, 5, 15];     // 待选法案堆





  skillList = []; // 技能列表
  playerList: Array<User>; // 参与本次游戏的玩家列表，主要用于消息发送

  proIndex = 16; // 牌堆顶
  proEffBlue = 0; // 法案生效数
  proEffRed = 0;
  failTimes = 0; // 政府组件失败次数

  toDoSth: string;
  constructor(
    private userService: UserService,
    private theGameService: TheGameService,
    private socketSevice: SocketSevice
  ) { }


  userSeat() {
    console.log('我要坐下');
    this.socketSevice.userSeat();
  }


  startGame() {
    this.socketSevice.startGame();
  }


  vote() {
    this.toDoSth = '投票'; console.log(this.toDoSth);
  }
  preSelect(name?) {
    if (name) {
      console.log(name);
    } else {
      this.toDoSth = '选总统'; console.log(this.toDoSth);
    }


  }
  prmSelect() {
    this.toDoSth = '选总理'; console.log(this.toDoSth);
  }
  proSelect(pro) {
    console.log(pro);
    this.toDoSth = '选法案'; console.log(this.toDoSth);
  }
  tmp() {
    this.toDoSth = '啥都没做1'; console.log(this.toDoSth);
  }
  back() {
    this.toDoSth = '啥都没做2'; console.log(this.toDoSth);
  }


  displayButtonList() {
    console.log('批量显示按钮');
  }


}

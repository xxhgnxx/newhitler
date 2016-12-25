import { Component } from '@angular/core';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../services';
import { UserService } from '../services';
import { TheGameService } from '../services';
import { SocketSevice } from '../services';

@Component({

  selector: 'gameControl',
  styleUrls: ['gameControl.component.css'],
  templateUrl: 'gameControl.component.html',
  providers: [NgbTooltipConfig]

})
export class GameControlComponent {
  proX3List = this.theGameService.proX3List;     // 待选法案堆

  isVoted: boolean = this.theGameService.isVoted;


  target: User = this.theGameService.target;  //  收到影响的玩家 临时变量

  skillList = []; // 技能列表
  playerList: Array<User>; // 参与本次游戏的玩家列表，主要用于消息发送

  proIndex = 16; // 牌堆顶
  proEffBlue = 0; // 法案生效数
  proEffRed = 0;
  failTimes = 0; // 政府组件失败次数

  toDoSth: string = this.theGameService.toDoSth;
  constructor(
    tipconfig: NgbTooltipConfig,
    private userService: UserService,
    private theGameService: TheGameService,
    private socketSevice: SocketSevice
  ) {
tipconfig.placement = 'top';
   }


  userSeat() {
    console.log('我要坐下');
    this.socketSevice.userSeat();
  }


  startGame() {
    this.socketSevice.startGame();
  }


  vote(n: number) {
    this.theGameService.isVoted = true;
    this.socketSevice.vote(n);

  }

  veto_all(n: number) {
    this.socketSevice.veto_all(n);


  }

  prmSelect(user: User) {
    console.log(user);
    this.socketSevice.prmSelect(user);
    this.theGameService.toDoSth = '等待响应。。。';
  }

  preSelect(user: User) {
    console.log('选总统啦');
    this.socketSevice.preSelect(user);
  }
  toKill(user: User) {
    console.log('枪决啦');
    this.socketSevice.toKill(user);
  }

  proSelect(pro) {
    this.socketSevice.proSelect(pro);
  }

  tmp() {
    this.theGameService.toDoSth = '啥都没做1'; console.log(this.toDoSth);
  }
  back() {
    this.theGameService.toDoSth = '啥都没做2'; console.log(this.toDoSth);
  }
  invPlayer(player: User) {
    this.socketSevice.invPlayer(player);
  }

  veto() {
    // 全部否决
    console.log('全部否决请求');
    this.socketSevice.veto();
  }


  displayButtonList() {
    console.log('批量显示按钮');
  }


}

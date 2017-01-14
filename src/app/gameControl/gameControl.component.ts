import { Component } from '@angular/core';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../services';
import { UserService } from '../services';
import { TheGameService } from '../services';
import { SocketSevice } from '../services';
import { TheMsgService } from '../services/msg.service';

@Component({

  selector: 'gameControl',
  styleUrls: ['gameControl.component.css'],
  templateUrl: 'gameControl.component.html',
  providers: [NgbTooltipConfig]

})
export class GameControlComponent {

  spktime = 180;
  popmsg = '请输入60-999之间的数字';


  constructor(
    tipconfig: NgbTooltipConfig,
    private userService: UserService,
    private theGameService: TheGameService,
    private theMsgService: TheMsgService,
    private socketSevice: SocketSevice
  ) {
    tipconfig.placement = 'top';
  }


  userSeat() {
    console.log('我要坐下');
    this.socketSevice.userSeat();
  }


  startGame() {

    let time = Math.round(this.spktime);
    if (this.spktime <= 0 || this.spktime >= 100) {

      this.popmsg = '输入内容不合理';
      setTimeout(() => {
        this.popmsg = '请输入60-999之间的数字';
      }, 3000);
      return;
    }

    this.socketSevice.startGame(time);

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
    // this.socketSevice.proSelect(pro);
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

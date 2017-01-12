let progressBar = require('progressbar.js');
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { User } from '../services/user';
import { UserService } from '../services/user.service';
import { TheMsgService } from '../services/msg.service';
import { SocketSevice } from '../services';
import { TheGameService } from '../services';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'hgnChoosePlayer',
  styleUrls: ['./choosePlayer.css'],
  templateUrl: './choosePlayer.html',
})

export class HgnChoosePlayer implements OnInit {
  @Input('hgn_data') hgnData: any = 'data出错啦xxxxxxxx';
  submit = false;
  constructor(
    public tipconfig: NgbTooltipConfig,
    public userService: UserService,
    public theMsgService: TheMsgService,
    public socketSevice: SocketSevice,
    public theGameService: TheGameService) {
    tipconfig.placement = 'top';
  }




  prmSelect(user: User) {
    if (this.submit) {
      return;
    }
    this.submit = true;
    if (!this.userService.yourself.isPre) {
      return;
    }
    if (!user.canBeSelect) {
      return;
    }
    console.log(user);
    this.socketSevice.prmSelect(user);
    this.theGameService.toDoSth = '等待响应。。。';
  }



  ngOnInit() {

    console.log('%cchoosePlayer', 'background: #03E0B2; color: #000');
    console.log(this.hgnData);
    // console.log(this.userService.yourself);
    // console.log(this.theMsgService.msgListAll);


  }




}

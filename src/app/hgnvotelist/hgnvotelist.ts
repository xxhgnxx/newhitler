let progressBar = require('progressbar.js');
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { User } from '../services/user';
import { UserService } from '../services/user.service';
import { TheMsgService } from '../services/msg.service';
import { SocketSevice } from '../services';
import { TheGameService } from '../services';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'hgnvotelist',
  styleUrls: ['./hgnvotelist.css'],
  templateUrl: './hgnvotelist.html',
})

export class Hgnvotelist implements OnInit {
  seeshow = false;
  constructor(
    tipconfig: NgbTooltipConfig,
    private userService: UserService,
    private theMsgService: TheMsgService,
    private socketSevice: SocketSevice,
    private theGameService: TheGameService) {
    tipconfig.placement = 'top';
  }

  getvote(vote) {
    switch (vote) {
      case 2:
        return './pic/yes.png';
      case 3:
        return './pic/no.png';
      case 4:
        return './pic/de.png';
      default:
        return './pic/what.png';
    }
  }

  msgshow() {
    this.seeshow = !this.seeshow;
  }
  getskill(skill) {
    switch (skill) {
      case 'toLookPro':
        return './pic/lookpro.png';
      case  'tokill':
        return './pic/tokill.png';
      case 'preSelect':
        return './pic/setpre.png';
      case 'invPlayer':
        return './pic/inv.png';
      default:
        return './pic/what.png';
    }
  }
  getskillname(skill) {
    switch (skill) {
      case 'toLookPro':
        return '查看三张法案';
      case  'tokill':
        return '枪决一人';
      case 'preSelect':
        return '指定总统';
      case 'invPlayer':
        return '调查玩家';
      default:
        return './pic/what.png';
    }
  }
  getpro(pro) {
    if (pro === 'x') {
      return './pic/x.png';
    } else {
      return pro > 5 ? './pic/r.png' : './pic/b.png';
    }
  }
  ngOnInit() {
    console.log('%cvote', 'background: #0D00FF; color: #FFF');
    console.log('被解析数据', this.theGameService.voteList);

  }




}

let progressBar = require('progressbar.js');
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { User } from '../services/user';
import { UserService } from '../services/user.service';
import { TheMsgService } from '../services/msg.service';
import { SocketSevice } from '../services';
import { TheGameService } from '../services';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'hgnCP',
  styleUrls: ['./hgnCP.css'],
  templateUrl: './hgnCP.html',
})

export class HgnCP implements OnInit {
  @Input('hgn_data') hgnData: any = 'data出错啦xxxxxxxx';
  myvotepic: string;
  constructor(
    tipconfig: NgbTooltipConfig,
    private userService: UserService,
    private theMsgService: TheMsgService,
    private socketSevice: SocketSevice,
    private theGameService: TheGameService) {
    tipconfig.placement = 'top';
  }

  setStyles() {
    let styles;
    if (this.hgnData.who.isPre) {
      styles = {
        'color': 'white',
        'background-color': '#5EA895',
      };
      return styles;
    }
    if (this.hgnData.who.isPrm) {
      styles = {
        'color': 'white',
        'background-color': '#AD7859',
      };
      return styles;
    }

    styles = {
      'color': 'white',
      'background-color': '#6BA9CF',
    };
    return styles;
  }


  gethead() {
    let src;
    if (this.hgnData.who.isPre) {
      src = './pic/总统标识.png';
      return src;
    }

    if (this.hgnData.who.isPrm) {
      src = './pic/总理标识.png';
      return src;
    }

    src = './pic/议员标识.png';
    return src;
  }


  vote(n: number) {
    this.theGameService.isVoted = true;
    this.hgnData.other1 = false;
    this.socketSevice.vote(n);
    if (n === 3) {
      this.myvotepic = './pic/反对.png';
    } else {
      this.myvotepic = './pic/同意.png';

    }
  }


  ngOnInit() {
    console.log('我初始化了');
    console.log(this.hgnData);
    console.log(this.hgnData.body);
    // console.log(this.theMsgService.msgListAll);
  }




}

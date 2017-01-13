let progressBar = require('progressbar.js');
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { User } from '../services/user';
import { UserService } from '../services/user.service';
import { TheMsgService } from '../services/msg.service';
import { SocketSevice } from '../services';
import { TheGameService } from '../services';


@Component({
  selector: 'hgnPlayermsg',
  styleUrls: ['./hgnContainer.css'],
  templateUrl: './hgnContainer.html',
})

export class HgnContainer implements OnInit {
  @Input('hgn_data') hgnData: any = 'data出错啦xxxxxxxx';
  barx: any;
  otherPlayerTimer: any;
  constructor(
    private userService: UserService,
    private theMsgService: TheMsgService,
    private socketSevice: SocketSevice,
    private theGameService: TheGameService) {
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









  ngOnInit() {
    console.log('kkkkkkkkkkkkkkkkkkkkkkk');
    setTimeout(() => {
      if (this.hgnData.who.name === this.userService.yourself.name && this.hgnData.step) {
        console.log('轮到我发言');
        this.theGameService.locked = true;
      } else {
        console.log('别人发言');
      }
    }, 1000);
  }




}

let progressBar = require('progressbar.js');
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { User } from '../services/user';
import { UserService } from '../services/user.service';
import { TheMsgService } from '../services/msg.service';
import { SocketSevice } from '../services';
import { TheGameService } from '../services';


@Component({
  selector: 'hgnTag',
  styleUrls: ['./hgnContainer.css'],
  templateUrl: './hgnContainer.html',
})

export class HgnContainer implements OnInit {
  @Input('hgn_data') hgnData: any = 'data出错啦xxxxxxxx';



  constructor(
    private userService: UserService,
    private theMsgService: TheMsgService,
    private socketSevice: SocketSevice,
    private theGameService: TheGameService) { }


  setStyles() {
    let styles;
    if (this.hgnData.msgFrom.isPre) {
      styles = {
        'color': 'white',
        'background-color': '#5EA895',
      };
      return styles;
    }
    if (this.hgnData.msgFrom.isPrm) {
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
    if (this.hgnData.msgFrom.isPre) {
      src = './pic/总统标识.png';
      return src;
    }

    if (this.hgnData.msgFrom.isPrm) {
      src = './pic/总理标识.png';
      return src;
    }

    src = './pic/议员标识.png';
    return src;
  }



  ngOnInit() {
    console.log(this.hgnData);
    console.log(this.hgnData.msgType);
  }

}

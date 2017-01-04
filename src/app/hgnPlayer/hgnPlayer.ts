let progressBar = require('progressbar.js');
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { User } from '../services/user';
import { UserService } from '../services/user.service';
import { TheMsgService } from '../services/msg.service';
import { SocketSevice } from '../services';
import { TheGameService } from '../services';


@Component({
  selector: 'hgnPlayer',
  styleUrls: ['./hgnPlayer.css'],
  templateUrl: './hgnPlayer.html',
})

export class HgnPlayer implements OnInit {
  @Input('hgn_data') player: any = 'data出错啦xxxxxxxx';
  @Input('hgn_size') size: any = '9999px';
  @Input('hgn_style') mystyle: number = 1;

  constructor(
    private userService: UserService,
    private theMsgService: TheMsgService,
    private socketSevice: SocketSevice,
    private theGameService: TheGameService) {
  }


  setStyleshead() {
    let styles;
    styles = {

      'height': this.size.toString() + 'px',

    };
    return styles;
  }
  setStylesNumber() {
    let styles;

    styles = {
      'height': (this.size * 0.65).toString() + 'px',
      'left': (this.size * 0.13).toString() + 'px',
      'top': (this.size * 0.17).toString() + 'px',
    };



    return styles;
  }

  setStylesName() {
    let styles;
    styles = {
      'margin-top': (this.size * 0.13).toString() + 'px',
      'padding-left': (this.size * 0.3).toString() + 'px',
      // 'border-radius': '0.3em 0.3em 0.3em 0.3em',
      // 'font-family': '"黑体"',
      'font-size': (this.size * 3.5).toString() + '%',
      'left': (this.size * 0.8).toString() + 'px',
      // 'zoom': '200%',
      // 'float': 'left',
      'width': (this.size * 5.4).toString() + 'px',
    };
    if (this.player.isPre) {
      styles['background-color'] = '#2CA283';
      styles['color'] = 'white';
      return styles;
    }
    if (this.player.isPrm) {
      styles['background-color'] = '#AD7859';
      styles['color'] = 'white';
      return styles;
    }
    styles['background-color'] = '#B2D8E6';
    styles['color'] = 'black';
    return styles;
  }


  gethead() {
    let src;
    if (this.player.isPre) {
      src = './pic/总统标识.png';
      return src;
    }

    if (this.player.isPrm) {
      src = './pic/总理标识.png';
      return src;
    }

    src = './pic/议员标识.png';
    return src;
  }
  getNumber() {
    let src;
    if (this.player.seatNo <= 10) {
      src = './pic/' + this.player.seatNo + '.png';
    } else {
      src = './pic/errorNo.png';
    }

    if (!this.theGameService.started && this.player.isSeat) {
        src = './pic/ok.png';
    }
    return src;
  }




  ngOnInit() {


  }




}

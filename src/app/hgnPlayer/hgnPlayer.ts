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

  hgnget() {
    return {
      offline: !this.player.isOnline && this.mystyle === 0,
      canselete: this.mystyle === 1 && this.player.canBeSelect && this.userService.yourself.isPre,
    };
  }


  // setClasses(){
  //     return {
  //         saveable:this.canSave,      //true
  //         modified:!this.isUnchanged, //false
  //         special:this.isSpecial      //true
  //     }
  // }



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
      'padding-left': (this.size).toString() + 'px',
      // 'border-radius': '0.3em 0.3em 0.3em 0.3em',
      // 'font-family': ''黑体'',
      'font-size': (this.size * 3.5).toString() + '%',
      'left': (this.size * 0.8).toString() + 'px',
      // 'zoom': '200%',
      // 'float': 'left',
      'width': (this.size * 5.4).toString() + 'px',
      'border': '2px solid transparent',
    };
    if (!this.player.isSurvival) {
      styles['background-color'] = '#F46565';
      styles['color'] = 'white';
      styles['border-color'] = '#861313';

      return styles;
    }
    if (!this.player.canBeSelect && this.mystyle === 1) {
      styles['background-color'] = '#6F6F6F';
      styles['color'] = 'white';
      styles['border-color'] = '#615F5F';

      return styles;
    }
    if (this.player.isPre) {
      styles['background-color'] = '#2CA283';
      styles['color'] = 'white';
      styles['border-color'] = '#28886F';

      return styles;
    }

    if (this.player.isPrm) {
      styles['background-color'] = '#AD7859';
      styles['color'] = 'white';
      styles['border-color'] = '#93664C';

      return styles;
    }
    styles['background-color'] = '#E3FCE6';
    styles['color'] = 'black';
    styles['border-color'] = 'rgb(209, 216, 212)';
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
    if (!this.player.isSurvival) {
        return src = './pic/dead.png';
    }
    if (this.player.seatNo <= 10 && this.player.seatNo !== 0) {
      return src = './pic/' + this.player.seatNo + '.png';
    } else {
      if (this.player.isSeat) {
        return src = './pic/ok.png';
      } else {
        return src = './pic/' + this.player.seatNo + '.png';
      }
    }
  }




  ngOnInit() {
    // console.log('%cPlayer', 'background: #0D00FF; color: #FFF');
    // console.log('被解析数据', this.player);

  }




}

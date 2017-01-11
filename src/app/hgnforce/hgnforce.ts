let progressBar = require('progressbar.js');
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { User } from '../services/user';
import { UserService } from '../services/user.service';
import { TheMsgService } from '../services/msg.service';
import { SocketSevice } from '../services';
import { TheGameService } from '../services';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'hgnforce',
  styleUrls: ['./hgnforce.css'],
  templateUrl: './hgnforce.html',
})

export class Hgnforce implements OnInit {
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

  getstep() {
    let str;
    switch (this.hgnData.step) {
      case 0: {
        str = '法案生效';
      }
        break;
      case 1: {
        str = '总统正在选择法案';
      }
        break;
      case 2: {
        str = '总理正在选择法案';
      }
        break;
      case 3: {
        str = '总理正在选择法案，他可以根据情况提出否决全部法案的要求';
      }
        break;
      case 4: {
        str = '总理向总统提出了否决全部的建议，等待总统决定';
      }
      break;
      case 40: {
        str = '全部法案被否决';
      }
        break;
      case 5: {
        str = '总统拒绝了提议，总理仍旧要做出选择';
      }
        break;
      case 51: {
        str = '总统拒绝了提议，你仍旧要做出选择';
      }
        break;
      default:
    }
    return str;
  }



  proSelect(pro) {
    if (pro === 'x' || this.hgnData.step === 0 ||
      this.hgnData.step === 40 || this.hgnData.step === 3 || this.hgnData.step === 4) {
      return;
    }
    if (this.hgnData.step !== 1 && this.userService.yourself.isPre) {
      return;
    }
    this.socketSevice.proSelect(this.hgnData.proX3List, pro);

  }



  getpro_pre(pro) {
    if (pro === 'x') {
      if (this.hgnData.step !== 1) {
        return './pic/法案背x.png';
      }
      return './pic/法案背.png';
    } else {
      if (pro > 5) {
        if (this.hgnData.step !== 1) {
          return './pic/红色法案x.png';
        }
        return './pic/红色法案.png';
      } else {
        if (this.hgnData.step !== 1) {
          return './pic/蓝色法案x.png';
        }
        return './pic/蓝色法案.png';
      }
    }
  }

  getpro_prm(pro) {
    if (pro === 'x') {
      if (this.hgnData.step !== 2 && this.hgnData.step !== 3
        && this.hgnData.step !== 5 && this.hgnData.step !== 4) {
        return './pic/法案背x.png';
      }
      return './pic/法案背.png';
    } else {
      if (pro > 5) {
        if (this.hgnData.step === 0 || this.hgnData.step === 40) {
          return './pic/红色法案x.png';
        }
        return './pic/红色法案.png';
      } else {
        if (this.hgnData.step === 0 || this.hgnData.step === 40) {
          return './pic/蓝色法案x.png';
        }
        return './pic/蓝色法案.png';
      }
    }
  }







  isYou(): boolean {
    if (this.hgnData.other === 'pre_CP' && this.userService.yourself.isPre) {
      return true;
    }
    if (this.hgnData.other === 'prm_CP' && this.userService.yourself.isPrm) {
      return true;
    }
    return false;
  }

  veto() {
    // 全部否决
    console.log('全部否决请求');
    this.socketSevice.veto();
  }

  veto_all(n: number) {
    this.socketSevice.veto_all(n);


  }

  ngOnInit() {
    console.log('%cforce', 'background: #6CC97B; color: #F00');
    console.log(this.hgnData);
    // console.log(this.theMsgService.msgListAll);
  }




}

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

  get_pre_CP() { }
  get_prm_CP() { }
  get_last() { }

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
    console.log('%c选法案过程', 'background: #6CC97B; color: #F00');
    console.log(this.hgnData);
    // console.log(this.theMsgService.msgListAll);
  }




}

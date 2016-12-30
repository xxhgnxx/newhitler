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


    if (this.hgnData.other === 'pre_CP' && this.userService.yourself.isPre) {
      this.socketSevice.proSelect(this.hgnData.body, pro);
    }
    if (this.hgnData.other === 'prm_CP' && this.userService.yourself.isPrm) {

      if (this.hgnData.other1 !== 'veto_all') {
        this.socketSevice.proSelect(this.hgnData.body, pro);

      }
      if (this.hgnData.other2 === 'not_veto_all') {
        this.socketSevice.proSelect(this.hgnData.body, pro);

      }



    }


  }



  getpro_pre(pro) {
    if (pro === 'x') {
      if (this.hgnData.other !== 'pre_CP') {
        return './pic/法案背x.png';
      }
      return './pic/法案背.png';
    } else {
      if (pro > 5) {
        if (this.hgnData.other !== 'pre_CP') {
          return './pic/红色法案x.png';
        }
        return './pic/红色法案.png';
      } else {
        if (this.hgnData.other !== 'pre_CP') {
          return './pic/蓝色法案x.png';
        }
        return './pic/蓝色法案.png';
      }
    }
  }
  getpro_prm(pro) {
    if (pro === 'x') {
      if (this.hgnData.other !== 'prm_CP' || this.hgnData.other2 === 'veto_all') {
        return './pic/法案背x.png';
      }
      return './pic/法案背.png';
    } else {
      if (pro > 5) {
        if (this.hgnData.other !== 'prm_CP' || this.hgnData.other2 === 'veto_all') {
          return './pic/红色法案x.png';
        }
        return './pic/红色法案.png';
      } else {
        if (this.hgnData.other !== 'prm_CP' || this.hgnData.other2 === 'veto_all') {
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
    console.log('我初始化了');
    console.log(this.hgnData);
    console.log(this.hgnData.body);
    // console.log(this.theMsgService.msgListAll);
  }




}

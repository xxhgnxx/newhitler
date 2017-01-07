let progressBar = require('progressbar.js');
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { User } from '../services/user';
import { UserService } from '../services/user.service';
import { TheMsgService } from '../services/msg.service';
import { SocketSevice } from '../services';
import { TheGameService } from '../services';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'hgnlookpro',
  styleUrls: ['./hgnlookpro.css'],
  templateUrl: './hgnlookpro.html',
})

export class Hgnlookpro implements OnInit {
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
    this.socketSevice.proSelect(this.hgnData.body, pro);
}


}

getstylepre(){

  let styles = {
    };

  if (this.hgnData.other !== 'pre_CP') {
    styles = {
        // CSS property names
        'opacity':  '0.5',
      };
  }
  return styles;
}
getstyleprm(){
  let styles = {
    };

  if (this.hgnData.other !== 'prm_CP') {
    styles = {
        // CSS property names
        'opacity':  '0.5',
      };
  }
  return styles;
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

  ngOnInit() {
    console.log('%clookpro', 'background: #E0A903; color: #000');
    console.log(this.hgnData);

    // console.log(this.theMsgService.msgListAll);
  }




}

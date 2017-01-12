import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { User } from '../services/user';
import { UserService } from '../services/user.service';
import { TheMsgService } from '../services/msg.service';
import { SocketSevice } from '../services';
import { TheGameService } from '../services';


@Component({
  selector: 'hgnVote',
  styleUrls: ['./hgnVote.css'],
  templateUrl: './hgnVote.html',
})

export class HgnVote implements OnInit {
  @Input('hgn_data') hgnData: any = 'data出错啦xxxxxxxx';
  myvotepic: string;
  submit = false;
  constructor(

    private userService: UserService,
    private theMsgService: TheMsgService,
    private socketSevice: SocketSevice,
    private theGameService: TheGameService) {
  }


  vote(n: number) {
    if (this.submit) {
      return;
    }
    this.submit = true;
    // this.theGameService.isVoted = true;
    // this.hgnData.other1 = false;
    this.socketSevice.vote(n);
    // if (n === 3) {
    //   this.myvotepic = './pic/反对.png';
    // } else {
    //   this.myvotepic = './pic/同意.png';
    //
    // }
  }

  getres() {
    return this.hgnData.voteRes > 1 ? '政府组建失败' : '政府组建成功';
  }

  ngOnInit() {
    console.log('%cvote', 'background: #03E0B2; color: #000');
    console.log(this.hgnData);
    // console.log(this.theMsgService.msgListAll);
  }




}

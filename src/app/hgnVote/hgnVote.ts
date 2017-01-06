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
  constructor(

    private userService: UserService,
    private theMsgService: TheMsgService,
    private socketSevice: SocketSevice,
    private theGameService: TheGameService) {
  }


  vote(n: number) {
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


  ngOnInit() {
    console.log('我初始化了');
    console.log(this.hgnData);
    console.log(this.hgnData.body);
    // console.log(this.theMsgService.msgListAll);
  }




}

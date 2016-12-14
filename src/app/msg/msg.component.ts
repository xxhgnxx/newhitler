import { Component } from '@angular/core';

import { AppState } from '../app.service';
import { User } from '../services/user';
import { UserService } from '../services/user.service';
import { ColorPickerService } from 'angular2-color-picker';
import { TheMsgService } from '../services/msg.service';
import { SocketSevice } from '../services';

@Component({

  selector: 'msg',  // <userslist></userslist>
  // We need to tell Angular's Dependency Injection which providers are in our app.

  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: ['./msg.component.css'],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './msg.component.html'
})
export class MsgComponent {
  sth: string = '#127bdc';
  msgListAll = new Array<any>();
  msgListNow = new Array<any>();
  locked: boolean = false;  // 禁止发言
  speakTime: number;  // 发言时间
  msgFrom: User | string;   // 消息来源  用户 或者 系统(string)
  timewidth = 0;
  private color: string = '#127bdc';



  speakNow(time) {
    this.locked = true;
    console.log('发言', time);
    setTimeout(() => { this.locked = false; }, time * 1000);


    this.timewidth = 0;
    let k = setInterval(() => {
      if (this.timewidth === 100) {
        clearInterval(k);
        console.log('完成');
      }

      this.timewidth += 0.1;
    }, time);

  }



  constructor(
    private userService: UserService,
    private theMsgService: TheMsgService,
    private socketSevice: SocketSevice,
    private cpService: ColorPickerService) {
    this.msgListAll.push(this.msgListNow);
  }


  tmp() {
    console.log(this.sth);
    // this.sth = '';

    this.msgListNow.push(this.sth);
    this.sth = '';
  }
  newDiv() {
    console.log(this.sth);
    // this.sth = '';
    this.msgListNow = new Array<any>();
    this.msgListAll.push(this.msgListNow);
    this.sth = '';
  }


  ngOnInit() {
    this.socketSevice.speakNow.subscribe(time => this.speakNow(time));
  }

}

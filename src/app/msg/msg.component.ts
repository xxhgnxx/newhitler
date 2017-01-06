let progressBar = require('progressbar.js');
import { Component } from '@angular/core';

import { AppState } from '../app.service';
import { User } from '../services/user';
import { UserService } from '../services/user.service';
import { ColorPickerService } from 'angular2-color-picker';
import { TheMsgService } from '../services/msg.service';
import { SocketSevice } from '../services';
import { NgbTabsetConfig } from '@ng-bootstrap/ng-bootstrap';
import { TheGameService } from '../services';

@Component({
  selector: 'msg',  // <userslist></userslist>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: ['./msg.component.css'],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './msg.component.html',
  providers: [NgbTabsetConfig],
})

export class MsgComponent {
  myInput: string = '嗯..';
  // msgList = this.theMsgService.msgList;
  // msgListAll = this.theMsgService.msgListAll;
  // msgListNow = this.theMsgService.msgListNow;
  locked: boolean = false;  // 禁止发言
  speakTime: number;  // 发言时间
  msgFrom: User | string;   // 消息来源  用户 或者 系统(string)
  timewidth = 0;
  speakEnd: any;
  bar: any;
  private color: string = '#127bdc';


  speakNow(time) {
    this.theGameService.locked = true;
    console.log('到你发言，发言时间', time);
    setTimeout(() => {
      this.locked = false;
      this.bar.destroy();
    }, time * 1000);

    this.bar = new progressBar.Circle('#container', {
      color: '#aaa',
      strokeWidth: 9,
      trailWidth: 6,
      // easing: 'easeInOut',

      text: {
        // autoStyleContainer: false
      },
      from: { color: '#ff0000', a: 0 },
      to: { color: '#00ff00', a: 0.5 },
      // Set default step function for all animate calls
      step: function(state, circle) {
        circle.path.setAttribute('stroke', state.color);
        let value = Math.round(circle.value() * time);
        if (value === 0) {
          circle.setText('');
        } else {
          circle.setText(value);
        }
      }
    });
    this.bar.set(1);
    this.bar.text.style.fontFamily = ' Helvetica, sans-serif';
    this.bar.text.style.fontSize = '2rem';

    this.bar.animate(0, {
      duration: time * 1000,
    }, function() {

    });

    this.speakEnd = this.socketSevice.speakEnd.subscribe(x => {
      this.theGameService.locked = false;
      console.log('时间到，轮到别人发言', this.speakEnd);
      this.speakEnd.unsubscribe();
    });

  }



  constructor(
    private userService: UserService,
    private theMsgService: TheMsgService,
    private socketSevice: SocketSevice,
    private theGameService: TheGameService,
    private cpService: ColorPickerService) {
  }


  // testjsson(n: number) {
  //   if (n === 1) {
  //     console.log('写入');
  //     localStorage.setItem('msglist', JSON.stringify(this.theMsgService.msgListAll));
  //     localStorage.setItem('whoareyou', JSON.stringify(this.userService.yourself));
  //     localStorage.setItem('playerList', JSON.stringify(this.theGameService.playerList));
  //     localStorage.setItem('pre', JSON.stringify(this.theGameService.pre));
  //   } else {
  //     console.log('读取');
  //     this.msgListAll = JSON.parse(localStorage.getItem('msglist'));
  //     this.userService.yourself = JSON.parse(localStorage.getItem('whoareyou'));
  //     this.theGameService.playerList = JSON.parse(localStorage.getItem('playerList'));
  //     this.theGameService.pre = JSON.parse(localStorage.getItem('pre'));
  //   }
  //   if (n === 3) {
  //     console.log('清除');
  //     localStorage.removeItem('msglist');
  //     localStorage.removeItem('whoareyou');
  //     localStorage.removeItem('playerList');
  //     localStorage.removeItem('pre');
  //   }
  // }





  tmp() {
    this.speakNow(120);
  }

  speak_end() {
    this.socketSevice.speak_end();
    this.bar.destroy();
  }

  // newDiv() {
  //   console.log(this.myInput);
  //   // this.sth = '';
  //   this.msgListNow = new Array<any>();
  //   this.msgListAll.push(this.msgListNow);
  //   this.myInput = '';
  // }


  sendMsg() {
    console.log(this.myInput);
    this.socketSevice.sendMsg(this.myInput);
    this.myInput = '';
  }

  ngOnInit() {
    this.socketSevice.speakNow.subscribe(time => this.speakNow(time));
  }

}

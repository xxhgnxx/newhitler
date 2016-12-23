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
  msgListAll = this.theMsgService.msgListAll;
  msgListNow = this.theMsgService.msgListNow;
  locked: boolean = false;  // 禁止发言
  speakTime: number;  // 发言时间
  msgFrom: User | string;   // 消息来源  用户 或者 系统(string)
  timewidth = 0;
  speakEnd: any;
  private color: string = '#127bdc';

  speakNow(time) {
    this.theGameService.locked = true;
    console.log('到你发言，发言时间', time);
    setTimeout(() => {
      this.locked = false;
    }, time * 1000);

    let bar = new progressBar.Circle('#container', {
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
    bar.set(1);
    bar.text.style.fontFamily = ' Helvetica, sans-serif';
    bar.text.style.fontSize = '2rem';

    bar.animate(0, {
      duration: time * 1000,
    }, function() {
      bar.destroy();
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
    this.msgListAll.push(this.msgListNow);

  }


  tmp() {
    this.speakNow(120);




  }

  speak_end() {
    this.socketSevice.speak_end();
  }

  newDiv() {
    console.log(this.myInput);
    // this.sth = '';
    this.msgListNow = new Array<any>();
    this.msgListAll.push(this.msgListNow);
    this.myInput = '';
  }


  sendMsg() {

    console.log(this.myInput);
    this.socketSevice.sendMsg(this.myInput);
    // this.myInput = '';
  }

  ngOnInit() {
    this.socketSevice.speakNow.subscribe(time => this.speakNow(time));
  }

}

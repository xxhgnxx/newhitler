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
  myInput: string = '嗯...';
  // msgList = this.theMsgService.msgList;
  // msgListAll = this.theMsgService.msgListAll;
  // msgListNow = this.theMsgService.msgListNow;
  locked: boolean = false;  // 禁止发言
  ortherskp: boolean = true;  // 别人发言计时
  speakTime: number;  // 发言时间
  msgFrom: User | string;   // 消息来源  用户 或者 系统(string)
  timewidth = 0;

  otherspeakEnd: any;
  speakEnd: any;
  bar: any;
  barx: any;
  private color: string = '#127bdc';



  speakNow(time) {
    this.socketSevice.otherspeakEnd.emit('end');
    this.theGameService.locked = true;
    console.log('发言计时器', time);
    setTimeout(() => {
      this.socketSevice.speakEnd.emit('end');
    }, time * 1000);

    this.barx = new progressBar.Line('#container', {
      strokeWidth: 32,
      color: '#aaa',
      trailWidth: 32,
      // svgStyle: { width: '100%', height: '100%' },
      text: {
        style: {
          // Text color.
          // Default: same as stroke color (options.color)
          color: '#999',
          position: 'absolute',
          right: '94px',
          padding: 0,
          margin: 0,
          transform: null
        },
        autoStyleContainer: false
      },
      from: { color: '#ff0000' },
      to: { color: '#00ff00' },
      step: (state, bar) => {
        let value = bar.setText(Math.round(bar.value() * time));
        bar.path.setAttribute('stroke', state.color);
      }
    });
    this.barx.set(1);
    this.barx.text.style.fontFamily = ' Helvetica, sans-serif';
    this.barx.text.style.fontSize = '3rem';

    this.barx.animate(0, {
      duration: time * 1000,
    }, function() {

    });

    this.speakEnd = this.socketSevice.speakEnd.subscribe(x => {
      this.barx.destroy();
      this.theGameService.locked = false;
      console.log('时间到，轮到别人发言', this.speakEnd);
      this.speakEnd.unsubscribe();
    });
  }
  otherspeakNow(time) {
    this.ortherskp = true;
    console.log('别人发言计时器', time, this.ortherskp);
    // setTimeout(() => {
    //   this.socketSevice.otherspeakEnd.emit('end');
    // }, time * 1000);

    this.bar = new progressBar.Line('#containerother', {
      strokeWidth: 6,
      color: '#aaa',
      trailWidth: 6,
      // svgStyle: { width: '100%', height: '100%' },
      text: {
        style: {
          // Text color.
          // Default: same as stroke color (options.color)
          color: '#999',
          position: 'absolute',
          right: '0px',
          padding: 0,
          margin: 0,
          bottom: '-9px',
          transform: null
        },
        autoStyleContainer: false
      },
      from: { color: '#ff0000' },
      to: { color: '#00ff00' },
      step: (state, bar) => {
        let value = bar.setText(Math.round(bar.value() * time));
        bar.path.setAttribute('stroke', state.color);
      }
    });
    this.bar.set(1);
    this.bar.text.style.fontFamily = ' Helvetica, sans-serif';
    this.bar.text.style.fontSize = '2rem';

    this.bar.animate(0, {
      duration: time * 1000,
    }, function() {

    });
    this.otherspeakEnd = this.socketSevice.otherspeakEnd.subscribe(x => {
      this.bar.destroy();
      this.ortherskp = false;
      this.otherspeakEnd.unsubscribe();
    });
  }



  constructor(
    private userService: UserService,
    private theMsgService: TheMsgService,
    private socketSevice: SocketSevice,
    private theGameService: TheGameService,
    private cpService: ColorPickerService) {
  }




  tmp() {
    if (this.theGameService.locked) {
      this.socketSevice.speakEnd.emit('end');
    } else {
      this.socketSevice.speakNow.emit(120);
    }
  }
  tmp2() {
    let r = confirm('Press a button!');
    if (r === true) {
      console.log('gogogogogog');
    }
    else {
      console.log('nonononog');
    }
  }



  speak_end() {
    this.socketSevice.speak_end();
    if (this.bar) {
    }
  }




  sendMsg() {
    if (this.theGameService.locked) {
      console.log(this.myInput);
      this.socketSevice.sendMsg(this.myInput);
      this.myInput = '';
    }


  }
  ngAfterViewInit() {



  }



  ngOnInit() {
    this.socketSevice.speakNow.subscribe(time => this.speakNow(time));
    this.socketSevice.otherspeakNow.subscribe(time => this.otherspeakNow(time));
  }

}

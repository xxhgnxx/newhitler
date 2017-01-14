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
  msgcomponent;
  myInput: string = '嗯...';
  // msgList = this.theMsgService.msgList;
  // msgListAll = this.theMsgService.msgListAll;
  // msgListNow = this.theMsgService.msgListNow;
  // locked: boolean = false;  // 禁止发言
  // spking: boolean = false;  // 准许发言状态
  ortherskp: boolean = true;  // 别人发言计时
  speakTime: number;  // 发言时间
  msgFrom: User | string;   // 消息来源  用户 或者 系统(string)
  timewidth = 0;

  bar: any;
  barx: any;
  n = 1;

  private color: string = '#127bdc';
  speakNow(time) {
    this.theGameService.locked = true;
    console.log('自己发言计时器');
    let timing = setTimeout(() => this.theGameService.locked = false, time * 1000);
    this.barx.set(1);
    this.barx.animate(0, {
      duration: time * 1000,
    });

    this.socketSevice.msgcomponent.subscribe(x => {
      if (x.type === 'someone_speak_end') {
        this.theGameService.locked = false;
        clearTimeout(timing);
      }
    });

  }




  otherspeakNow(time) {
    this.ortherskp = true;
    console.log('别人发言计时器');
    let timing = setTimeout(() => this.ortherskp = false, time * 1000);
    this.bar.set(1);
    this.bar.animate(0, {
      duration: time * 1000,
    });

    this.socketSevice.msgcomponent.subscribe(x => {
      if (x.type === 'someone_speak_end') {
        this.ortherskp = false;
        clearTimeout(timing);

      }
    });

  }


  put(x) {
    console.log(x);
    let data = [];
    data['speakTime'] = 5;
    data['whoIsSpeaking'] = [];
    switch (x) {
      case 'speak_endAll':
        data['type'] = x;
        this.socketSevice.msgcomponent.emit(data);
        break;
      case 'someone_speak_end':
        data['type'] = x;
        this.socketSevice.msgcomponent.emit(data);
        break;
      case 'newPlayerSpeak':
        data['type'] = x;
        data['whoIsSpeaking']['name'] = '111111';
        this.socketSevice.msgcomponent.emit(data);
        break;
      case 'newPlayerSpeak2':
        data['type'] = 'newPlayerSpeak';
        data['whoIsSpeaking']['name'] = '22222';
        this.socketSevice.msgcomponent.emit(data);
        break;
      default:
    }
  }


  constructor(
    private userService: UserService,
    private theMsgService: TheMsgService,
    private socketSevice: SocketSevice,
    private theGameService: TheGameService,
    private cpService: ColorPickerService) {
  }








  speak_end() {
    this.socketSevice.speak_end();
  }




  sendMsg() {
    if (this.theGameService.locked) {
      console.log(this.myInput);
      this.socketSevice.sendMsg(this.myInput);
      this.myInput = '';
    }
  }

  tmp() {

    let tmp = this.myInput.split(/\r\n|\r|\n/g);

    console.log(tmp);

  }


  whotodo(data) {
    switch (data.type) {
      case 'newPlayerSpeak':
        {
          if (this.userService.yourself.name === data.whoIsSpeaking.name) {
            this.theGameService.locked = true;
            this.speakNow(data.speakTime);
            console.log('你发言');
          } else {
            this.theGameService.locked = false;
            this.otherspeakNow(data.speakTime);
            console.log('别人发言');
          }
        }
        break;

      case 'someone_speak_end':
        {
          this.theGameService.locked = false;
          this.ortherskp = false;
        }
        break;
      default:
        console.log('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeerror');


    }
  }


  ngOnInit() {



    this.bar = new progressBar.Line('#containerother', {
      strokeWidth: 6,
      color: '#aaa',
      trailWidth: 6,
      text: {
        style: {
          color: '#999',
          position: 'absolute',
          right: '0px',
          padding: 0,
          margin: 0,
          bottom: '-9px',
          fontFamily: ' Helvetica, sans-serif',
          fontSize: '2rem',
          transform: null
        },
        autoStyleContainer: false
      },
      from: { color: '#ff0000' },
      to: { color: '#00ff00' },
      step: (state, bar) => {
        bar.setText(Math.round(bar.value() * this.theGameService.speakTime));
        bar.path.setAttribute('stroke', state.color);
      }
    });

    this.barx = new progressBar.Line('#container', {
      strokeWidth: 32,
      color: '#aaa',
      trailWidth: 32,
      text: {
        style: {
          color: '#999',
          position: 'absolute',
          right: '94px',
          padding: 0,
          margin: 0,
          transform: null,
          fontFamily: ' Helvetica, sans-serif',
          fontSize: '3rem'
        },
        autoStyleContainer: false
      },
      from: { color: '#ff0000' },
      to: { color: '#00ff00' },
      step: (state, barx) => {
        barx.setText(Math.round(barx.value() * this.theGameService.speakTime));
        barx.path.setAttribute('stroke', state.color);
      }
    });

    this.msgcomponent = this.socketSevice.msgcomponent.subscribe(x => {
      console.log(x);
      this.whotodo(x);
    });

    // console.log(JSON.parse(JSON.stringify(this.socketSevice.msgcomponent)))

  }

  ngOnDestroy() {

    this.msgcomponent.unsubscribe();

  }

}

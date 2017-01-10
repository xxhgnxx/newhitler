import { Component } from '@angular/core';
import { SocketSevice } from '../services';
import { UserService } from '../services';
import { TheGameService } from '../services';
import { Router } from '@angular/router';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';
import { TheMsgService } from '../services/msg.service';
let yaml = require('js-yaml');

let progressBar = require('progressbar.js');

@Component({

  selector: 'room',
  styleUrls: ['room.component.css'],
  templateUrl: 'room.component.html',
  providers: [NgbTooltipConfig]

})



export class RoomComponent {
  speakEnd: any;
  bar: any;
  locked: boolean = false;  // 禁止发言
  iszoom = false;
  broadstyles = {
    'width': '300px',
    'left': '0px',
    'top': '0px',
  };
  see = true;
  private head = new Map();

  cansee() {
    this.see = !this.see;
  }

  zoom() {
    console.log('放大/缩小');
    this.iszoom = !this.iszoom;
    if (this.iszoom) {
      this.broadstyles = {
        'width': '880px',
        'left': '0px',
        'top': '120px',
      };
    } else {
      this.broadstyles = {
        'width': '300px',
        'left': '0px',
        'top': '0px',
      };
    }
  }

  getbroad() {
    if (this.iszoom) {
      let list = ['./pic/t6.jpg', './pic/法西斯进度8.jpg', './pic/法西斯进度10.jpg'];
      return list[this.theGameService.gametype - 1];
    } else {
      let list = ['./pic/t6s.jpg', './pic/法西斯进度8.jpg', './pic/法西斯进度10.jpg'];
      return list[this.theGameService.gametype - 1];
    }

  }

  getback() {
    let styles = {};


    if (this.userService.yourself.name === '_') {
      styles['background-color'] = 'snow';
      return styles;
    }
    if (this.userService.yourself.isPre) {
      styles['background-color'] = 'mediumaquamarine';

      return styles;
    }
    if (this.userService.yourself.isPrm) {
      styles['background-color'] = 'chocolate';

      return styles;
    }
    styles['background-color'] = 'honeydew';

    return styles;



  }
  // speakNow(time) {
  //
  //   this.locked = true;
  //   console.log('发言', time);
  //   setTimeout(() => {
  //     this.locked = false;
  //   }, time * 1000);
  //
  //
  //
  //   this.bar.set(1);
  //   this.bar.text.style.fontFamily = ' Helvetica, sans-serif';
  //   this.bar.text.style.fontSize = '8rem';
  //   this.bar.animate(0., {
  //     duration: time * 1000,
  //   },
  //     function(state, circle) {
  //       circle.path.setAttribute('stroke', state.color);
  //       let value = Math.round(circle.value() * time);
  //       if (value === 0) {
  //         circle.setText('');
  //       } else {
  //         circle.setText(value);
  //       }
  //
  //     });
  //
  //
  //
  //   this.speakEnd = this.socketSevice.speakEnd.subscribe(x => {
  //     this.locked = false;
  //     console.log('时间到，轮到别人发言', this.speakEnd);
  //     this.speakEnd.unsubscribe();
  //   });
  //
  // }


  constructor(
    private router: Router,
    private socketsevice: SocketSevice,
    private theGameService: TheGameService,
    private theMsgService: TheMsgService,
    private userService: UserService) {
    // this.head['liberal'] = './pic/liberal.png';
    // this.head['Hitler'] = './pic/Hitler.jpg';
    // this.head['Fascist'] = './pic/Fascist.png';

  }




  ngOnInit() {
    if (!this.userService.isLogin) {
      if (sessionStorage.getItem('login')) {
        console.log('快速登陆');
        this.socketsevice.quickLogin(sessionStorage.getItem('login'));
        this.socketsevice.quickloginResult.subscribe((result) => {
          if (result === '认证成功') {
            console.log('登陆成功');
            this.router.navigate(['/room']);
            this.userService.isLogin = true;
            if (sessionStorage.getItem('mymsglist')) {
              this.theMsgService.msgList = yaml.safeLoad(sessionStorage.getItem('mymsglist'));
            }

          } else {
            this.router.navigate(['/login']);
            sessionStorage.removeItem('login');
            this.socketsevice.disconnect();
            console.log('登陆失败');
          }
        });
      } else {
        this.router.navigate(['/login']);
      }

    }

  }


}

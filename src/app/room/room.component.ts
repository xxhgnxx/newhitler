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
  alerts = false;
  speakEnd: any;
  bar: any;
  locked: boolean = false;  // 禁止发言
  iszoom = false;
  testlist = [1, 2, 3, 4, 5, 6];
  testlist1 = [1, 2, 3, 4, 5];
  broadstyles = {
    'width': '300px',
    'left': '0px',
    'top': '0px',
  };
  see = true;
  private head = new Map();

  cansee() {
    if (this.userService.yourself.role === 'Liberal') {
      return;
    }
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

      let n = this.userService.hList.playerList.length;
      if (this.iszoom) {
        if (n <= 6) {
          return './pic/t6.jpg';
        }
        if (n <= 8) {
          return './pic/t8.jpg';
        }
        return './pic/t10.jpg';
      } else {
        if (n <= 6) {
          return './pic/t6s.jpg';
        }
        if (n <= 8) {
          return './pic/t8s.jpg';
        }
        return './pic/t10s.jpg';
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



  admin() {
    if (this.iszoom) {
      this.router.navigate(['/admin']);
    }
  }

  ngOnInit() {

    this.socketsevice.disconnectalt.subscribe(
      () => {
        this.alerts = true;

      }
    );

    if (!this.userService.isLogin) {
      if (sessionStorage.getItem('login')) {
        console.log('快速登陆 ');
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

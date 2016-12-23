import { Component } from '@angular/core';
import { SocketSevice } from '../services';
import { UserService } from '../services';
import { TheGameService } from '../services';
import { Router } from '@angular/router';

let progressBar = require('progressbar.js');

@Component({

  selector: 'room',
  styleUrls: ['room.component.css'],
  templateUrl: 'room.component.html'

})



export class RoomComponent {
  speakEnd: any;
  bar: any;
  locked: boolean = false;  // 禁止发言
  private head = new Map();

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
        this.userService.isLogin = true;
      } else {
        this.router.navigate(['/login']);
        sessionStorage.removeItem('login');
        console.log('登陆失败');
      }
    });
  }else{
this.router.navigate(['/login']);
  }

}

  }


}

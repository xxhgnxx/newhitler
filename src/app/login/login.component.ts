import { Component } from '@angular/core';
let io = require('socket.io-client');
import { SocketSevice } from '../services/socket.service';
import { UserService } from '../services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'login',
  styleUrls: ['login.component.css'],
  // templateUrl: 'login.component.html'
  templateUrl: 'login.component.html'
})

export class LoginComponent {
  step = true;
  big = false;
  // socket = this.socketsevice.socket;
  sexes = ['呵呵', 'a', 'b', '扶她'];
  // tmp = new MyUsers(18, Math.floor(Math.random() * 1000).toString(), this.sexes[3]);
  submiting = false;
  username = '';
  userpassword = '';
  alerts: string = '';
  constructor(
    private router: Router,
    public userService: UserService,
    private socketsevice: SocketSevice) {
  }

  tobig() {
    this.big = !this.big;
  }

  // async onSubmit() {
  //   this.submiting = true;
  //   let status = await this.socketsevice.start();
  //   if (status) {
  //     console.log('链接服务器成功');
  //
  //     this.socketsevice.login(this.username, this.userpassword);
  //     let timer = setTimeout(() => {
  //       this.submiting = false;
  //       if (this.userService.isLogin) {
  //         console.log('已经登陆');
  //         this.router.navigate(['/room']);
  //       } else {
  //         console.log('计时器登陆失败');
  //       }
  //     }, 2000);
  //     this.socketsevice.loginFail.subscribe(() => {
  //       this.submiting = false;
  //       clearTimeout(timer);
  //       console.log('密码错误');
  //     });
  //
  //   } else {
  //
  //     this.submiting = false;
  //     console.log('链接服务器失败');
  //   }
  // };

  change() {
    this.step = !this.step;
  }

  onSubmit() {
    if (strlen(this.username) < 4) {
      this.alerts = '名字太短啦';
      setTimeout(() => this.alerts = '', 3000);
      return;
    }
    if (strlen(this.username) > 16) {
      this.alerts = '名字太长啦';
      setTimeout(() => this.alerts = '', 3000);
      return;
    }


    console.log('尝试登陆');
    this.submiting = true;
    this.socketsevice.login(this.username, this.userpassword);
    this.socketsevice.loginResult.subscribe((result) => {
      this.submiting = false;
      if (result === '认证成功') {
        console.log('登陆成功');
        this.userService.isLogin = true;
        this.router.navigate(['/room']);
      } else {
        if (result === '认证失败') {
          this.alerts = this.userService.other;
        } else {
          this.alerts = result;
        }
        setTimeout(() => this.alerts = '', 3000);
        // this.socketsevice.disconnect();
        console.log('认证失败');
      }
    });

  }



  tmp() {
    this.router.navigate(['/room']);
  }

  ngOnInit() {

  }


}




class MyUsers {
  constructor(
    public id: number,
    public name: string,
    public sex?: string
  ) { }


}


function strlen(str) {
  let len = 0;
  for (let i = 0; i < str.length; i++) {
    let c = str.charCodeAt(i);
    if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
      len++;
    }
    else {
      len += 2;
    }
  }
  return len;
}

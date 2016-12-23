/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';

import { AppState } from './app.service';
import { SocketSevice } from './services';
import { UserService } from './services';
/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css'
  ],
  template: `

      <router-outlet></router-outlet>


  `
})
export class AppComponent {

  constructor(
    public appState: AppState,
    public userService: UserService,
    private socketsevice: SocketSevice) {

  }

  ngOnInit() {
    // console.log('Initial App State', this.appState.state);



    if (sessionStorage.getItem('login')) {
      console.log('快速登陆');
      // let status = await this.socketsevice.start();
      // if (status) {
      //   console.log('链接服务器成功');
      //   this.socketsevice.quickLogin(sessionStorage.getItem('login'));
      //
      //   // let timer = setTimeout(() => {
      //   //   console.log('快速登陆超时');
      //   //   sessionStorage.removeItem('login');
      //   // }, 2000);
      //
      //   this.socketsevice.loginFail.subscribe(() => {
      //     // clearTimeout(timer);
      //     sessionStorage.removeItem('login');
      //     console.log('指纹错误');
      //
      //   });
      //
      // }
      this.socketsevice.quickLogin(sessionStorage.getItem('login'));
      this.socketsevice.quickloginResult.subscribe((result) => {
        if (result === '认证成功') {
          console.log('登陆成功');
          this.userService.isLogin = true;
        } else {
          sessionStorage.removeItem('login');
          console.log('登陆失败');
        }
      });


    }

  }

}



/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */

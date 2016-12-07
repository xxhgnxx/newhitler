/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';

import { AppState } from './app.service';
import { SocketSevice } from './services/socket.service';
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
    <nav>
    <span>
      <a [routerLink]=" ['./'] ">
        Index
      </a>
    </span>
    |
    <span>
      <a [routerLink]=" ['./login'] ">
        login
      </a>
    </span>
    |
    <span>
      <a [routerLink]=" ['./room'] ">
        room
      </a>
    </span>
    |
    <span>
      <a [routerLink]=" ['./about'] ">
        About
      </a>
    </span>
    </nav>

<login></login>
<gameControl>游戏空间加载中</gameControl>
      <router-outlet></router-outlet>


  `
})
export class AppComponent {

  constructor(
    public appState: AppState,
    private socketsertttvice: SocketSevice) {

  }

  ngOnInit() {
    console.log('Initial App State', this.appState.state);
  }

}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */

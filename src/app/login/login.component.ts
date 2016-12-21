import { Component } from '@angular/core';
let io = require('socket.io-client');
import { SocketSevice } from '../services/socket.service';


@Component({
  selector: 'login',
  styleUrls: ['login.component.css'],
  // templateUrl: 'login.component.html'
  templateUrl: 'login.component.html'
})

export class LoginComponent {
  // socket = this.socketsevice.socket;
  sexes = ['呵呵', 'a', 'b', '扶她'];
  tmp = new MyUsers(18, Math.floor(Math.random() * 1000).toString(), this.sexes[3]);
  logined = false;
  submiting = false;
  username = '1';
  userpassword = '1';
  constructor(private socketsevice: SocketSevice) { }





  onSubmit = async function() {

    let status = await this.socketsevice.start();
    if (status) {
      console.log('ok');
    } else {
      console.log('false');
    }





    // this.socketsevice.login(this.username, this.userpassword, x => {
    //   this.logined = x;
    //   this.submiting = x;
    // });
  };
}

class MyUsers {
  constructor(
    public id: number,
    public name: string,
    public sex?: string
  ) { }
}

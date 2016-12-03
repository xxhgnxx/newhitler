import { Component } from '@angular/core';
let io = require('socket.io-client');
import { SocketSevice } from '../services/socket.service';
@Component({

  selector: 'login',
  styleUrls: ['login.component.css'],
  templateUrl: 'login.component.html'

})
export class LoginComponent {
  socket = this.socketsevice.socket;

  sexes = ['呵呵', 'a', 'b', '扶她'];
  tmp = new MyUsers(18, '123', this.sexes[3]);
  submitted = false;
  constructor(private socketsevice: SocketSevice) {

  }
  onSubmit(name) {

    this.submitted = true;
    this.tmp.name = name;
    console.log(name);
    this.userLogin(name);

  }
  // TODO: Remove this when we're done
  // get diagnostic() { return JSON.stringify(this.model); }



  userLogin(name) {
    console.log(this.tmp.name + '用户登陆');
    this.socket.emit('login', name);

  }




}

class MyUsers {
  constructor(
    public id: number,
    public name: string,
    public sex?: string,
  ) { }
}

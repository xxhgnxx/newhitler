import { Component } from '@angular/core';
let io = require('socket.io-client');
import { SocketSevice } from '../services/socket.service';



@Component({

  selector: 'login',
  styleUrls: ['login.component.css'],
  templateUrl: 'login.component.html'

})
export class LoginComponent {
  // socket = this.socketsevice.socket;
  sexes = ['呵呵', 'a', 'b', '扶她'];
  tmp = new MyUsers(18, Math.floor(Math.random() * 1000).toString(), this.sexes[3]);
  submitted = false;
  constructor(private socketsevice: SocketSevice) { }

  onSubmit(name: string) {
    this.socketsevice.login(name, x => {
      this.submitted = x;
    });
  }

}

class MyUsers {
  constructor(
    public id: number,
    public name: string,
    public sex?: string,
  ) { }
}

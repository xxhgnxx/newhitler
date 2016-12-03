import { Component } from '@angular/core';
let io = require('socket.io-client');
import { SocketSevice } from '../services/socket.service';


@Component({

  selector: 'room',
  styleUrls: ['room.component.css'],
  templateUrl: 'room.component.html',
  providers: [SocketSevice]

})
export class RoomComponent {





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
    console.log(this.tmp.name + '用户登陆');



  }
  // TODO: Remove this when we're done
  // get diagnostic() { return JSON.stringify(this.model); }
}

class MyUsers {
  constructor(
    public id: number,
    public name: string,
    public sex?: string,
  ) { }
}

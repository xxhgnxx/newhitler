import { Component } from '@angular/core';
let io = require('socket.io-client');
import { SocketSevice } from '../services/socket.service';


@Component({

  selector: 'room',
  styleUrls: ['room.component.css'],
  templateUrl: 'room.component.html'

})
export class RoomComponent {
  constructor(private socketsevice: SocketSevice) { }
}

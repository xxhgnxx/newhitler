import { Component } from '@angular/core';
import { SocketSevice } from '../services';
import { UserService } from '../services';
import { TheGameService } from '../services';

@Component({

  selector: 'room',
  styleUrls: ['room.component.css'],
  templateUrl: 'room.component.html'

})
export class RoomComponent {
  private head = new Map();
  constructor(
    private socketsevice: SocketSevice,
    private theGameService: TheGameService,
    private userService: UserService) {
    this.head['liberal'] = './pic/liberal.png';
    this.head['Hitler'] = './pic/Hitler.jpg';
    this.head['Fascist'] = './pic/Fascist.png';

  }



}

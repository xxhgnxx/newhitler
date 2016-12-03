import { Injectable } from '@angular/core';
import { User }  from './user';
import { getdate } from '../services/user';




@Injectable()
export class UserService {
  // userLsit = [];
  userLsit = getdate();
  yourself: User;
  joinRoom() { }
  joinGame() { }
  upDataList() {

  }


}

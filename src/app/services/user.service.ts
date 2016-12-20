//  本地用户列表更新服务 用于维护本地用户列表
import { Injectable } from '@angular/core';
import { User }  from './user';
import { SocketSevice } from './socket.service';
import { Data } from './data';


@Injectable()
export class UserService {
  userList: Array<User>;
  // userLsit = getdate();
  yourself: User = new User('_');
  yourHead: string;
  role: string = 'x';
  teamMsg = '游戏尚未开始';

  whoAmI(list: Array<User>) {
    console.log('定位身份');
    console.log(list);
    this.yourself = list.filter(t => {
      return t.socketId === this.yourself.socketId;
    })[0];
    console.log(this.yourself);
  }


  setTeam(data: Data) {
    this.role = data.role;
    if (this.role === 'Liberal') {
      this.teamMsg = '你是自由党，你什么都不知道';
    } else {
      if (this.role === 'Fascist') {
        this.teamMsg = '你是：法西斯 ';

        if (data.other.length > 1) {
          for (let i = 0; i < data.other.length; i++) {
            if (data.other[i].socketId !== this.yourself.socketId) {
              this.teamMsg = this.teamMsg + data.other[i].name + ' ';
            }
          }
          this.teamMsg = this.teamMsg + ' 是你的法西斯队友 ';
        }

        this.teamMsg = this.teamMsg + data.target.name + '是希特勒 ';

      } else {
        this.teamMsg = '你是：希特勒';
        if (typeof data.other === 'undefined') {
          this.teamMsg = this.teamMsg + ' 你并不知道谁是你的队友';
        } else {
          for (let i = 0; i < data.other.length; i++) {
            this.teamMsg = this.teamMsg + data.other[i].name + ' ';
          }
          this.teamMsg = this.teamMsg + '是你的法西斯队友 ';
        }
      }
    }

  }

  constructor() { }
}

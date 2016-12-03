import { Component } from '@angular/core';

import { AppState } from '../app.service';
import { User } from '../services/user';
import { UserService } from '../services/user.service';

@Component({

  selector: 'msg',  // <userslist></userslist>
  // We need to tell Angular's Dependency Injection which providers are in our app.

  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: ['./msg.component.css'],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './msg.component.html'
})
export class MsgComponent {

  constructor(private userService: UserService) { }


  getUsers(): void {
    console.log('获取数据');
    console.log(this.userService.userLsit);
  }



  ngOnInit() {
    console.log('读取用户列表数据');
    // this.title.getData().subscribe(data => this.data = data);
    this.getUsers();
  }

}

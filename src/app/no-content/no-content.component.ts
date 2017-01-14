import { Component } from '@angular/core';
import { TheMsgService } from '../services/msg.service';
import { SocketSevice } from '../services';
import { UserService } from '../services';
import { TheGameService } from '../services';
import { Router } from '@angular/router';

@Component({
  selector: 'no-content',
  styleUrls: ['./test.css'],
  templateUrl: './test.html',
})
export class NoContentComponent {
  adminpassword: string;
  who = 'who';

  tmp() {
    if (this.adminpassword === '皇冠鸟') {
      this.who = 'yes';
    } else {
      this.who = 'no';
    }
  }

  kick(user) {
    console.log(user);
    this.socketsevice.kick(user);
  }

  restart() {
    this.socketsevice.restart();
  }


  constructor(
    private router: Router,
    private socketsevice: SocketSevice,
    private theGameService: TheGameService,
    private theMsgService: TheMsgService,
    private userService: UserService) {

  }
  ngOnInit() {
    if (!this.userService.isLogin) {
      this.router.navigate(['/login']);
    }
  }
}

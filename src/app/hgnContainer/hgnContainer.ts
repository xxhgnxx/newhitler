let progressBar = require('progressbar.js');
import { Component } from '@angular/core';
import { User } from '../services/user';
import { UserService } from '../services/user.service';
import { TheMsgService } from '../services/msg.service';
import { SocketSevice } from '../services';
import { TheGameService } from '../services';


@Component({
  selector: 'hgnTag',
  styleUrls: ['./hgnContainer.css'],
  templateUrl: './hgnContainer.html',
})

export class HgnContainer {

  constructor(
    private userService: UserService,
    private theMsgService: TheMsgService,
    private socketSevice: SocketSevice,
    private theGameService: TheGameService) {
  }



  ngOnInit() {
  }

}

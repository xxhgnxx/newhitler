import { Component } from '@angular/core';

import { AppState } from '../app.service';
import { User } from '../services/user';
import { UserService } from '../services/user.service';
import { TheGameService } from '../services/game.service';
@Component({

  selector: 'userslist',  // <userslist></userslist>
  // We need to tell Angular's Dependency Injection which providers are in our app.

  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: ['./userslist.component.css'],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './userslist.component.html'
})
export class UserslistComponent {

  constructor(private userService: UserService, private theGameService: TheGameService) { }
  ngOnInit() {
  }

}

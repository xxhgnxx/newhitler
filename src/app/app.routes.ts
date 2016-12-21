import { Routes, RouterModule } from '@angular/router';
import { UserslistComponent } from './userslist';
import { AboutComponent } from './about';
import { LoginComponent } from './login';
import { NoContentComponent } from './no-content';
import { RoomComponent } from './room/room.component';
import { DataResolver } from './app.resolver';

export const ROUTES: Routes = [
  { path: 'userslist', component: UserslistComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: LoginComponent },
  { path: 'room', component: RoomComponent },
];

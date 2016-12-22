import { Routes, RouterModule } from '@angular/router';
import { UserslistComponent } from './userslist';
import { AboutComponent } from './about';
import { LoginComponent } from './login';
import { NoContentComponent } from './no-content';
import { RoomComponent } from './room/room.component';
import { DataResolver } from './app.resolver';
import { LoginCheck } from './admin';

export const ROUTES: Routes = [
  { path: 'room', component: RoomComponent, canActivate: [LoginCheck] },
  { path: 'userslist', component: UserslistComponent },
  { path: 'login', component: LoginComponent, canActivate: [LoginCheck] },
  { path: '**', component: LoginComponent },

];

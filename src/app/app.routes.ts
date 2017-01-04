import { Routes, RouterModule } from '@angular/router';
import { UserslistComponent } from './userslist';
import { AboutComponent } from './about';
import { LoginComponent } from './login';
import { NoContentComponent } from './no-content';
import { RoomComponent } from './room/room.component';
import { DataResolver } from './app.resolver';
import { LoginCheck } from './admin';
import { HgnContainer } from './hgnContainer/hgnContainer';

export const ROUTES: Routes = [
  // { path: 'room', component: RoomComponent, canActivate: [LoginCheck] },
  { path: 'room', component: RoomComponent },
  { path: 'userslist', component: UserslistComponent },
  { path: 'nothing', component: NoContentComponent },
  { path: 'hgnTag', component: HgnContainer },
  { path: 'login', component: LoginComponent },
  { path: '**', component: LoginComponent },

];

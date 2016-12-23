import { Injectable }     from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
}                           from '@angular/router';
import { UserService } from './services';


@Injectable()
export class LoginCheck implements CanActivate {

  constructor(private userService: UserService, private router: Router) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let url: string = state.url;
    return this.checkLogin(url);

  }

  checkLogin(url: string): boolean {
    if (this.userService.isLogin) {
      return true;
    }
    console.log('请先登陆');
    this.router.navigate(['/nothing']);
    return false;
  }



}

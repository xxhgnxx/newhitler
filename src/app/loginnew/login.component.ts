import { Inject } from '@angular/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { USER_STATUS_CODES } from '../shared/services/user/user-status-codes';
import { UserServiceTTT } from './user.service';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/interval';

@Component({
  selector: 'loginTTT',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponentTTT implements OnInit, OnDestroy {
  title = 'loginTTT';





  authenticatedObs: Observable<boolean>;
  userServiceSub: Subscription;
  authSub: Subscription;

  form: FormGroup;

  /**
   * Boolean used in telling the UI
   * that the form has been submitted
   * and is awaiting a response
   */
  submitted: boolean = false;

  /**
   * Diagnostic message from received
   * form request error
   */
  errorDiagnostic: string;

  constructor(
    private _userService: UserServiceTTT,
    private _router: Router,
    private formBuilder: FormBuilder
    // @Inject('apiBase') private _apiBase: string
  ) {

  }

  ngOnInit() {

    this.form = this.formBuilder.group({
      username: ['',
        Validators.compose([Validators.required, Validators.minLength(3),
          Validators.maxLength(64)])],
      password: ['',
        Validators.compose([Validators.required, Validators.minLength(3),
          Validators.maxLength(32)])]
    });

  }
  //
  //   authenticated(): Observable<boolean> {
  //     if (this.authenticatedObs) return this.authenticatedObs;
  //     this.authenticatedObs = this._userService.authenticated()
  //       .map(data => { return data.authenticated });
  //     return this.authenticatedObs;
  //   }
  //
  //   openAuthWindow(provider: string) {
  //     /**
  //      * Total hack until new router is used (for authentication and activation logic)
  //      */
  // var newWindow = window.open(`${this._apiBase}/authorize/${provider}`,
  //   'name', 'height=585, width=770');
  // 	   if (window.focus) {
  //       newWindow.focus();
  //     }
  //
  //     let source = Observable.interval(2000)
  //       .map(() => {
  //         this.userServiceSub = this.authenticated().subscribe(data => {
  //           if (data) {
  //             this._router.navigate(['/']);
  //             newWindow.close();
  //           }
  //         })
  //       })
  //
  //     if (this.authSub) this.authSub.unsubscribe();
  //     this.authSub = source.subscribe();
  //
  //   }
  //
  //   repository() {
  //     window.location.href = this.githubLink;
  //   }
  //
  //   register() {
  //     this._router.navigate(['/register']);
  //   }
  //
  onSubmit() {
    /**
     * Innocent until proven guilty
     */
    // this.submitted = true;
    // this.errorDiagnostic = null;
    //
    // this._userService.login(this.form.value).subscribe(data => {
    //   this._router.navigate(['/']);
    // },
    //   error => {
    //     this.submitted = false;
    //     this.errorDiagnostic = USER_STATUS_CODES[error.status] || USER_STATUS_CODES[500];
    //   });
  }

  ngOnDestroy() {
    if (this.userServiceSub) this.userServiceSub.unsubscribe();
    if (this.authSub) this.authSub.unsubscribe();
  }

}

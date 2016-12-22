import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// 样式组件
import { MdCard, MdCardContent, MdCardSubtitle, MdCardTitle } from '@angular2-material/card';
import { MdToolbar, MdToolbarRow } from '@angular2-material/toolbar';
import { MdSidenav, MdSidenavLayout } from '@angular2-material/sidenav';
import { MdList, MdListItem } from '@angular2-material/list';
import { MdButton } from '@angular2-material/button';
import { MdInput } from '@angular2-material/input';
import { MdIcon, MdIconRegistry } from '@angular2-material/icon';
import { MdSpinner } from '@angular2-material/progress-circle';

// 颜色提取器
import { ColorPickerModule } from 'angular2-color-picker';
// 自动滚动
import { Angular2AutoScroll } from 'angular2-auto-scroll/lib/angular2-auto-scroll.directive';
// 根组件
import { AppComponent } from './app.component';

// 路由检查器
import { LoginCheck } from './admin';



// 服务组件
import { SocketSevice } from './services/socket.service';
import { UserService } from './services/user.service';
import { GameControlComponent } from './gameControl/gameControl.component';
import { TheGameService } from './services/game.service';
import { TheMsgService } from './services/msg.service';

// 管道
import { GetHeadPope } from './pipe/getHeadPope';
import { GetVote } from './pipe/getvote';

// 其他组件
import { UserslistComponent } from './userslist';
import { LoginComponent } from './login';
import { RoomComponent } from './room/room.component';
import { MsgComponent } from './msg/msg.component';
/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component

import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';


//  无效页面
import { NoContentComponent } from './no-content';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    LoginComponent,
    UserslistComponent,
    GameControlComponent,
    RoomComponent,
    MsgComponent,
    NoContentComponent,
    GetHeadPope,
    GetVote,
    MdCard,
    MdCardContent,
    MdInput,
    MdCardSubtitle,
    MdCardTitle,
    MdToolbar,
    MdToolbarRow,
    MdSidenav,
    MdSidenavLayout,
    MdList,
    MdListItem,
    MdButton,
    MdIcon,
    Angular2AutoScroll,
    MdSpinner
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    NgbModule,
    FormsModule,
    HttpModule,
    ColorPickerModule,
    RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules })
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS,
    SocketSevice,
    UserService,
    GameControlComponent,
    TheMsgService,
    TheGameService,
    LoginCheck
  ]
})
export class AppModule {
  constructor(public appRef: ApplicationRef, public appState: AppState) { }

  hmrOnInit(store: StoreType) {
    if (!store || !store.state) return;
    console.log('HMR store', JSON.stringify(store, null, 2));
    // set state
    this.appState._state = store.state;
    // set input values
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // save state
    const state = this.appState._state;
    store.state = state;
    // recreate root elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // save input values
    store.restoreInputValues = createInputTransfer();
    // remove styles
    removeNgStyles();
  }

  hmrAfterDestroy(store: StoreType) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}

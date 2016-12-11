import { Component } from 'angular2/core';
import { EventEmitter } from 'angular2/core';
import { Injectable } from 'angular2/core';

@Injectable()
class AAAAAAAService {
  dataA: string;
  constructor() { }
}

//  合理用法
@Injectable()
class BBBBBBBBBBService {
  // A注入了B中
  dataB = this.aaaaaa;
  constructor(private aaaaaa: AAAAAAAService) { }
}

//  不合理用法
@Injectable()
class CCCCCCCCCCService {
  // C中注入了A
  constructor(private aaaaaa: AAAAAAAService) { }
  set() { this.aaaaaa.dataA = '99999我被C修改了'; };
}

@Component({
  selector: 'app',
  template: `<h2>a</h2>`
})
class ComponentXXXXXXX {
  public i: number = 0;
  // 组建X中注入了b
  constructor(private bbbbbbbbbb: BBBBBBBBBBService) { }
  do() { }
}

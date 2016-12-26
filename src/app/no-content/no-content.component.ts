import { Component } from '@angular/core';


class User {
  socketId: string = 'x';
  isOnline: boolean = true;
  isSurvival: boolean = true;
  isSeat: boolean = false;
  seatNo: number = 0;
  name: string;
  password: string;
  isLastPre: boolean = false;
  isLastPrm: boolean = false;
  isPre: boolean = false;
  isPrm: boolean = false;
  isHitler: boolean = false;
  isFascist: boolean = false;
  role: string = 'x';
  canBeSelect: boolean = true;
  constructor(name: string) { this.name = name; }
}

class MsgContainer {
  msgFrom = new User('system');
  msgType = 'string';
  msgbody = new Array<string>();

  constructor(who: User, type: string, msgbody: any) {
    this.msgFrom = who;
    this.msgType = type;
    this.msgbody.push(msgbody);
    this.msgbody.push(msgbody);
    this.msgbody.push(msgbody);
    this.msgbody.push(msgbody);
    this.msgbody.push(msgbody);
    this.msgbody.push(msgbody);
  }
}

let testuser = new User('皇冠鸟');
testuser.socketId = 'x';
testuser.isOnline = true;
testuser.isSurvival = true;
testuser.isSeat = false;
testuser.seatNo = 0;
testuser.isLastPre = false;
testuser.isLastPrm = false;
testuser.isPre = true;
testuser.isPrm = false;
testuser.isHitler = false;
testuser.isFascist = false;
testuser.role = 'x';
testuser.canBeSelect = true;
let testuser1 = new User('阿依吐拉公主');
testuser1.socketId = 'x';
testuser1.isOnline = true;
testuser1.isSurvival = true;
testuser1.isSeat = false;
testuser1.seatNo = 0;
testuser1.isLastPre = false;
testuser1.isLastPrm = false;
testuser1.isPre = false;
testuser1.isPrm = true;
testuser1.isHitler = false;
testuser1.isFascist = false;
testuser1.role = 'x';
testuser1.canBeSelect = true;
let testuser2 = new User('乾坤霹靂狗');
testuser2.socketId = 'x';
testuser2.isOnline = true;
testuser2.isSurvival = true;
testuser2.isSeat = false;
testuser2.seatNo = 0;
testuser2.isLastPre = false;
testuser2.isLastPrm = false;
testuser2.isPre = false;
testuser2.isPrm = false;
testuser2.isHitler = false;
testuser2.isFascist = false;
testuser2.role = 'x';
testuser2.canBeSelect = true;

let testmsg = new MsgContainer(testuser, 'said', '我勒个去！00');
let testmsg1 = new MsgContainer(testuser1, 'said', '我勒个去！11');
let testmsg2 = new MsgContainer(testuser2, 'said', '我勒个去！22');


@Component({
  selector: 'no-content',
  template: `
    <hgnTag [hgn_data]='data' [hgn_type]= 'type' ></hgnTag>
    <hgnTag [hgn_data]='data1' [hgn_type]= 'type1' ></hgnTag>
    <hgnTag [hgn_data]='data2' [hgn_type]= 'type2' ></hgnTag>
  `
})
export class NoContentComponent {

  data = testmsg;
  data1 = testmsg1;
  data2 = testmsg2;
  type = testmsg.msgType;
  type1 = testmsg1.msgType;
  type2 = testmsg2.msgType;


}

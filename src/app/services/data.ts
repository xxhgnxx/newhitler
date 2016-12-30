import { User } from './user';


export class Data {
  name: string;
  pass: string;
  msg: Msg;
  yourself: User;
  user: User;

  // 登陆相关
  id: string;
  login: boolean;
  back: boolean;

  // 游戏相关
  target: User;  //  收到影响的玩家

  // 游戏数据
  started: boolean;       // 游戏是否开始
  speakTime: number;
  role: string;

  // 玩家相关
  userList: Array<User>; // 用户列表传输
  playerList: Array<User>; // 加入本次游戏的玩家列表，主要用于消息发送
  fascistCount: number; // 法西斯玩家数量
  liberalCount: number; // 自由党玩家数量

  // 法案牌堆相关
  proIndex: number; // 牌堆顶
  proList: Array<any>;  // 法案牌堆
  proX3List: Array<number>; // 法案牌摸的三张牌
  pro: number; // 选择弃掉的法案

  // 投票相关
  isVoted: boolean;   // 投票是否结束
  voteList: Array<Array<number>>; // 投票总记录
  nowVote: Array<number>; // 当前正在进行的投票
  voteRes: number; // 投票结果
  voteCount: number;  //  投票数量

  // 游戏进程
  failTimes: number; // 政府组件失败次数
  proEffBlue: number; // 蓝法案生效数
  proEffRed: number; // 红法案生效数

  // 游戏过程记录
  // gameStep: string;  // 游戏阶段

  // 情况
  pre: User;
  lastPre: User;
  prenext: User;
  prm: User;
  prmTmp: User;  // 待投票的总理
  lastPrm: User;

  // 其他
  other: any;

  // 备用
  socketId: string;
  key: string;
  constructor(public type: string, toWho?: Array<User> | User) { }
}
export class MsgData {
  locked: boolean;  // 禁止发言
  speakTime: number;  // 发言时间
  msgFrom: User | string;   // 消息来源  用户 或者 系统(string)
  msgListAll: Array<any>;  // 完整的消息记录
  msg: Msg;     // msg内容
  type: string;
  constructor(public whoIsSpeaking: User) {
    this.type = 'some_one_speak_sth';
  }
}

export class Msg {
  type: string;
  constructor(public who: any, public body: any,
    public other?: any, public other1?: any, public other2?: any) {
    if (typeof who === 'string') {
      this.type = who;
    } else {
      this.type = 'playerMsg';
    }
  }
}


// 数据包处理  test
export function dataLoader(userService, theGameService, theMsgService, dataAll: Data | MsgData) {
  let msg = dataAll.type;
  let data = (<Data>dataAll);
  let msgdata = (<MsgData>dataAll);


  if (typeof data.id !== 'undefined') {
    sessionStorage.setItem('login', data.id);
    //  todo 待修改！
    // userService.whoAmI(userService.yourself);
    msg = msg + ' ' + 'sessionStorage.login' + data.id;
  }

  if (typeof data.login !== 'undefined') {
    if (!data.login) {
      sessionStorage.removeItem('login');
    }

  }

  if (typeof data.userList !== 'undefined') {
    userService.userList = data.userList;
    //  todo 待修改！
    userService.whoAmI(data.userList);
    msg = msg + ' ' + 'userList';
  }

  if (typeof data.playerList !== 'undefined') {
    theGameService.playerList = data.playerList;
    // 待确认
    userService.whoAmI(data.playerList);
    msg = msg + ' ' + 'playerList';
  }

  if (typeof data.proIndex !== 'undefined') {
    theGameService.proIndex = data.proIndex;
    msg = msg + ' ' + 'proIndex';
  }
  if (typeof data.nowVote !== 'undefined') {

    theGameService.nowVote = data.nowVote;
    msg = msg + ' ' + 'nowVote';
  }
  if (typeof data.voteCount !== 'undefined') {
    theGameService.voteCount = data.voteCount;
    msg = msg + ' ' + 'voteCount';
  }
  if (typeof data.proList !== 'undefined') {
    theGameService.proList = data.proList;
    msg = msg + ' ' + 'proList';
  }
  if (typeof data.started !== 'undefined') {
    theGameService.started = data.started;
    msg = msg + ' ' + 'started';
  }
  if (typeof data.proEffBlue !== 'undefined') {
    theGameService.proEffBlue = data.proEffBlue;
    msg = msg + ' ' + 'proEffBlue';
  }
  if (typeof data.proEffRed !== 'undefined') {
    theGameService.proEffRed = data.proEffRed;
    msg = msg + ' ' + 'proIndex';
  }
  if (typeof data.failTimes !== 'undefined') {
    theGameService.failTimes = data.failTimes;
    msg = msg + ' ' + 'failTimes';
  }
  if (typeof data.fascistCount !== 'undefined') {
    theGameService.fascistCount = data.fascistCount;
    msg = msg + ' ' + 'fascistCount';
  }
  if (typeof data.liberalCount !== 'undefined') {
    theGameService.liberalCount = data.liberalCount;
    msg = msg + ' ' + 'liberalCount';
  }
  if (typeof data.lastPre !== 'undefined') {
    theGameService.lastPre = data.lastPre;
    msg = msg + ' ' + 'lastPre';
  }
  if (typeof data.lastPrm !== 'undefined') {
    theGameService.lastPrm = data.lastPrm;
    msg = msg + ' ' + 'lastPrm';
  }
  if (typeof data.pre !== 'undefined') {
    theGameService.pre = data.pre;
    msg = msg + ' ' + 'pre';
  }
  if (typeof data.prenext !== 'undefined') {
    theGameService.prenext = data.prenext;
    msg = msg + ' ' + 'prenext';
  }
  if (typeof data.prm !== 'undefined') {
    theGameService.prm = data.prm;
    msg = msg + ' ' + 'prm';
  }

  if (typeof data.proX3List !== 'undefined') {
    // theGameService.proX3List = data.proX3List;
    msg = msg + ' ' + 'proX3List(未生效)';
  }
  if (typeof data.isVoted !== 'undefined') {
    theGameService.isVoted = data.isVoted;
    msg = msg + ' ' + 'isVoted';
  }
  if (typeof data.other !== 'undefined') {
    theGameService.other = data.other;
    msg = msg + ' ' + 'other';
  }
  if (typeof data.prmTmp !== 'undefined') {
    theGameService.prmTmp = data.prmTmp;
    msg = msg + ' ' + 'prmTmp';
  }
  if (typeof data.target !== 'undefined') {
    theGameService.target = data.target;
    msg = msg + ' ' + 'target';
  }

  if (typeof data.speakTime !== 'undefined') {
    // speakNow.emit(msgdata.speakTime);
    theGameService.speakTime = msgdata.speakTime;
    msg = msg + ' ' + 'timing';
  }

  // --------------------- 发言

  if (typeof msgdata.locked !== 'undefined') {
    theMsgService.locked = msgdata.locked;
    msg = msg + ' ' + 'locked';
  }

  if (typeof msgdata.msgFrom !== 'undefined') {
    theMsgService.msgFrom = msgdata.msgFrom;
    msg = msg + ' ' + 'msgFrom';
  }
  // if (typeof msgdata.msgListAll !== 'undefined') {
  //   theMsgService.msgListAll = msgdata.msgListAll;
  //   msg = msg + ' ' + 'msgListAll';
  // }
  // if (typeof msgdata.msg !== 'undefined') {
  //
  //   if (msgdata.msg.type === 'playerMsg') {
  //     if (typeof theMsgService.msgListAll[theMsgService.msgListAll.length - 1] !== 'undefined') {
  //       if (theMsgService.msgListAll[theMsgService.msgListAll.length - 1].who.name
  //         === msgdata.msg.who.name) {
  //         theMsgService.msgListAll[theMsgService.msgListAll.length - 1]
  // .body.push(msgdata.msg.body);
  //       } else {
  //         let tmp0 = new Array();
  //         tmp0.push(msgdata.msg.body);
  //         let tmp = new Msg(msgdata.msg.who, tmp0);
  //         tmp.type = 'playerMsg';
  //         theMsgService.msgListAll.push(tmp);
  //       }
  //
  //     } else {
  //       theMsgService.msgListAll.push(msgdata.msg);
  //     }
  //   } else {
  //     let tmp0 = new Array();
  //     tmp0.push(msgdata.msg.body);
  //     let tmp = new Msg(msgdata.msg.who, tmp0);
  //     theMsgService.msgListAll.push(tmp);
  //   }
  //
  //   msg = msg + ' ' + 'msg';
  // }
  // theMsgService.msgListNow.push('数据读取' + msg);   // 测试用输出到聊天记录中
  console.log('%c数据读取', 'background: #222; color: #bada55', msg);
}



export function msgLoader(userService, theGameService, theMsgService, msg: Msg) {
  switch (msg.type) {
    case 'system':
      theMsgService.msgListAll.push(msg);
      break;
    case 'playerMsg':
      {
        if (typeof theMsgService.msgListAll[theMsgService.msgListAll.length - 1]
          !== 'undefined') {
          if (theMsgService.msgListAll[theMsgService.msgListAll.length - 1].who.name
            === msg.who.name) {
            theMsgService.msgListAll[theMsgService.msgListAll.length - 1].body.push(msg.body);
          } else {
            let tmp0 = new Array();
            tmp0.push(msg.body);
            let tmp = new Msg(msg.who, tmp0);
            tmp.type = 'playerMsg';
            theMsgService.msgListAll.push(tmp);
          }

        } else {
          theMsgService.msgListAll.push(msg);
        }
      }
      break;

    case 'choosePlayer':
      {

        if (theMsgService.controlNow) {
          theMsgService.controlNow.other1 = false;
          theMsgService.controlNow.other2 = msg.other2;
          theMsgService.controlNow = false;
        } else {
          theMsgService.msgListAll.push(msg);
          theMsgService.controlNow = msg;
        }
      }



      break;
    case 'player_vote':
      theMsgService.msgListAll.push(msg);
      break;
    case 'hgnlookpro':
      theMsgService.msgListAll.push(msg);
      break;
    case 'playerCP':

      console.log('待处理', msg);
      if (msg.other1 === 'veto_all') {
        console.log('other2是', msg.other2);
        theMsgService.controlNow.other1 = msg.other1;
        theMsgService.controlNow.other2 = msg.other2;
        if (msg.other2 === 'veto_all') {
          theMsgService.controlNow = false;
        }

      } else {
        switch (msg.other) {
          case 'pre_CP':
            theMsgService.controlNow = msg;
            theMsgService.msgListAll.push(msg);
            if (userService.yourself.isPre) {
              theMsgService.controlNow.body = theMsgService.controlNow.other1;
            }
            break;
          case 'prm_CP':
            theMsgService.controlNow.body = msg.body;
            theMsgService.controlNow.other = msg.other;
            theMsgService.controlNow.other1 = msg.other1;
            if (userService.yourself.isPrm) {
              theMsgService.controlNow.body[1] = msg.other1[1];
            }
            if (msg.other2 === 'prm_CP_veto_all') {
              theMsgService.controlNow.other2 = msg.other2;
            }
            if (userService.yourself.isPre) {
              theMsgService.controlNow.body = theMsgService.controlNow.other1;
            }
            console.log(theMsgService.controlNow);
            break;
          case 'end_CP':
            theMsgService.controlNow.body = msg.body;
            theMsgService.controlNow.other = msg.other;
            theMsgService.controlNow.other1 = msg.other1;
            if (userService.yourself.isPrm) {
              theMsgService.controlNow.body[1] = msg.other1[1];
              theMsgService.controlNow.body[2] = msg.other1[2];
            }
            if (userService.yourself.isPre) {
              theMsgService.controlNow.body = theMsgService.controlNow.other1;
            }
            theMsgService.controlNow.body[2] = msg.other1[2];
            console.log(theMsgService.controlNow);
            theMsgService.controlNow = false;
            break;
          default:
            console.log('%cplayerCP错误', 'background: #FF5C00; color: #bada55', msg);
        }


        console.log('处理结果', theMsgService.controlNow);
      }




      break;


    default:

      console.log('%cmsg错误', 'background: rgba(#D669F1); color: #bada55', msg);




  }

}

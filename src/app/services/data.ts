// scoket数据包结构
import { User } from './user';
import { Vote } from './vote';
import { UserService } from './user.service';
export class Data {
  type: string;
  name: string;
  msg: string;
  user: User;
  userList: Array<User>;
  // 游戏数据
  started: boolean = false;       // 游戏是否开始

  playerList: Array<User>; // 加入本次游戏的玩家列表，主要用于消息发送
  fascistCount: number; // 法西斯玩家数量
  liberalCount: number; // 自由党玩家数量

  proIndex = 16; // 牌堆顶
  proList = new Array<any>();  // 法案牌堆
  proX3List: Array<number>; // 法案牌摸的三张牌

  voteList: Array<Array<number>>; // 投票总记录
  nowVote: Array<number>; // 当前正在进行的投票
  voteRes: number; // 投票结果
  voteCount: number;  //  投票数量

  failTimes = 0; // 政府组件失败次数

  proEffBlue = 0; // 法案生效数
  proEffRed = 0; // 法案生效数




  lastPre: User;
  lastPrm: User;
  pre: User;
  prenext: User;
  prm: User;
  socketId: string;



  key: string;
  constructor() { }
}

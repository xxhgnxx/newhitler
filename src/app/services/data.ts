// scoket数据包结构
import { User } from './user';
import { Vote } from './vote';
import { UserService } from './user.service';
export class Data {
  type: string;
  name: string;
  msg: string;
  user: User;
  key: string;
  // 游戏数据
  playerList: Array<User>; // 加入本次游戏的玩家列表，主要用于消息发送
  userList: Array<User>;
  proIndex = 16; // 牌堆顶
  voteList: Array<Vote>; // 投票情况
  proList = new Array<any>();  // 法案牌堆
  started: boolean = false;       // 游戏是否开始
  proEffBlue = 0; // 法案生效数
  proEffRed = 0; // 法案生效数
  failTimes = 0; // 政府组件失败次数
  fascistCount: number; // 法西斯玩家数量
  liberalCount: number; // 自由党玩家数量
  socketId: string;

  lastPre: User;
  lastPrm: User;
  pre: User;
  prenext: User;
  prm: User;
  constructor() { }
}

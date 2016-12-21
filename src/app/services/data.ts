import { User } from './user';
import { UserService } from './userService';

export class Data {
    type: string;
    toWho: Array<User> | User;
    name: string;
    pass: string;
    msg: string;
    yourself: User;
    user: User;

    // 游戏相关
    target: User;  //  收到影响的玩家

    // 游戏数据
    started: boolean;       // 游戏是否开始
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

    // 角色情况
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
    constructor() { }
}

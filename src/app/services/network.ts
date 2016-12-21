
import * as io from 'socket.io-client';
import { Data } from './data';
import { RandomString } from '../util';

/**
 * 网络服务socket：socket链接,systemFunc：消息处理服务，type：类型“server，client”
 */
export class NetworkSocket {
  private socket;

  /**
   * 初始化过程
   */
  public start(): Promise<any> {
    this.socket = io.connect('127.0.0.1:81', { reconnection: false });

    return new Promise(resolve => {
      let tmptimer = setTimeout(() => {
        console.log(Date().toString().slice(15, 25), '连接服务器', '失败');
        this.socket.off('ok');
        resolve(false);
      }, 2000);

      let tmpon = this.socket.on('ok', () => {
        console.log(Date().toString().slice(15, 25), '连接服务器', '成功', this.socket.id);
        this.socket.on('system', data => {
          this.socket.emit(data.key);
          resolve(this.socket.id);
        });
        resolve(true);
        clearTimeout(tmptimer);
      });
    });
  }















  /**
   * 获取socketID
   */
  getId(): string {
    return this.socket.id;
  }

  /**
   * 请求器，data：消息内容，cb：后续动作入口
   */
  public send(data: Data, cb: Function) {
    data.key = idgen();
    let tmpemit = this.socket.emit('system', data);
    let timeout = setTimeout(() => {
      tmpemit.close();
      cb(false);
    }, 3000);
    this.socket.once(data.key, () => {
      clearTimeout(timeout);
      this.socket.off(data.key);
      cb(true);
    });
  }

}


/**
 * 随机字符串
 */
function idgen(): string {
  const _printable: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let text = '';
  for (let i = 0; i < 22; i++) {
    text += _printable.charAt(Math.floor(Math.random() * _printable.length));
  }
  return text;
}

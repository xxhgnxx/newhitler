
import * as io from 'socket.io-client';
import { Data } from './data';
import { RandomString } from '../util';
import { myEmitter } from '../services';

/**
 * 网络服务socket：socket链接,systemFunc：消息处理服务，type：类型“server，client”
 */
export class NetworkSocket {
  private socket;

  /**
   * 初始化过程
   */
  public start(): Promise<any> {
    if (typeof this.socket !== 'undefined' && this.socket.connected) {
      console.log('已经连接');
      return new Promise(resolve => { resolve(this.socket.id); });

    } else {

      this.socket = io.connect('192.168.1.14:81', { reconnection: false });
      return new Promise(resolve => {
        let tmptimer = setTimeout(() => {
          console.log(Date().toString().slice(15, 25), '连接服务器', '失败');
          this.socket.off('ok');
          resolve(false);
        }, 2000);

        let tmpon = this.socket.on('ok', () => {
          console.log(Date().toString().slice(15, 25), '连接服务器', '成功', this.socket.id);
          resolve(this.socket.id);
          clearTimeout(tmptimer);
        });
      });


    }
  }

  public socketOnce(events: string, cb: Function) {
    this.socket.once(events, data => {
      cb(data);
    });
  }

  public disconnect() {
    this.socket.disconnect();
    delete this.socket;

  }

  public socketOn(cb: Function) {
    this.socket.on('system', data => {
      cb(data);
    });
  }









  tmp() {
    // myEmitter.emit('user_login_passWrong');
  }

  isOnline() {
    if (typeof this.socket !== 'undefined' && this.socket.connected) {
      return true;
    } else {
      return false;
    }
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

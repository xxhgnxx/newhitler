
import * as io from 'socket.io-client';
import { Data } from './data';
import { RandomString } from '../util';

/**
 * 网络服务socket：socket链接,systemFunc：消息处理服务，type：类型“server，client”
 */
export class NetworkSocket {
  private socket;
  public start(socket, systemFunc: Function) {
    this.socket = socket;

    this.socket.on('system', data => {
      this.socket.emit(data.key);
      systemFunc(data, socket.id);
    });

  }


  /**
   * 请求器，data：消息内容，cb：后续动作入口
   */
  public send(data: Data, cb: Function) {
    data.key = idgen();
    this.socket.emit('system', data);
    let timeout = setTimeout(() => {
      cb(false);
    }, 3000);
    this.socket.on(data.key, () => {
      clearTimeout(timeout);
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

let progressBar = require('progressbar.js');
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { User } from '../services/user';
import { UserService } from '../services/user.service';
import { TheMsgService } from '../services/msg.service';
import { SocketSevice } from '../services';
import { TheGameService } from '../services';


@Component({
  selector: 'hgnPlayermsg',
  styleUrls: ['./hgnContainer.css'],
  templateUrl: './hgnContainer.html',
})

export class HgnContainer implements OnInit {
  @Input('hgn_data') hgnData: any = 'data出错啦xxxxxxxx';
  bar: any;
  otherPlayerTimer: any;
  constructor(
    private userService: UserService,
    private theMsgService: TheMsgService,
    private socketSevice: SocketSevice,
    private theGameService: TheGameService) {
  }

  setStyles() {
    let styles;
    if (this.hgnData.who.isPre) {
      styles = {
        'color': 'white',
        'background-color': '#5EA895',
      };
      return styles;
    }
    if (this.hgnData.who.isPrm) {
      styles = {
        'color': 'white',
        'background-color': '#AD7859',
      };
      return styles;
    }

    styles = {
      'color': 'white',
      'background-color': '#6BA9CF',
    };
    return styles;
  }


  gethead() {
    let src;
    if (this.hgnData.who.isPre) {
      src = './pic/总统标识.png';
      return src;
    }

    if (this.hgnData.who.isPrm) {
      src = './pic/总理标识.png';
      return src;
    }

    src = './pic/议员标识.png';
    return src;
  }


  speakNow(time?) {

    if (time) {



    } else {
      this.hgnData.other = false;
      // this.bar.destroy();
      // this.otherPlayerTimer.unsubscribe();
      console.log('别人主动结束了发言');
    }

  }





  ngOnInit() {
    let speakTime = this.theGameService.speakTime;
    console.log('我初始化了');
    console.log(this.hgnData);
    console.log(this.hgnData.body);
    console.log(this.theMsgService.msgListAll);

    console.log('别人的发言时间', speakTime);
    setTimeout(() => {
      this.hgnData.other = false;
    }, speakTime * 1000);

    if (this.hgnData.other) {
      setTimeout(() => {


        this.bar = new progressBar.Circle('#containerother', {
          color: '#aaa',
          strokeWidth: 16,
          trailWidth: 8,
          // easing: 'easeInOut',

          text: {
            // autoStyleContainer: false
          },
          from: { color: '#ff0000', a: 0 },
          to: { color: '#00ff00', a: 0.5 },
          // Set default step function for all animate calls
          step: function(state, circle) {
            circle.path.setAttribute('stroke', state.color);
            let value = Math.round(circle.value() * speakTime);
            if (value === 0) {
              circle.setText('');
            } else {
              circle.setText(value);
            }
          }
        });
        this.bar.set(1);
        this.bar.text.style.fontFamily = ' Helvetica, sans-serif';
        this.bar.text.style.fontSize = '2rem';
        this.bar.text.style.left = '-100%';

        this.bar.animate(0, {
          duration: speakTime * 1000,
        }, function() {
          // this.bar.destroy();
          console.log('别人发言时间到,结束了');
          // this.otherPlayerTimer.unsubscribe();
        });
      }, 0);
    }



  }




}

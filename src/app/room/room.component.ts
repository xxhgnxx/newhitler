import { Component } from '@angular/core';
import { SocketSevice } from '../services';
import { UserService } from '../services';
import { TheGameService } from '../services';
let progressBar = require('progressbar.js');

@Component({

  selector: 'room',
  styleUrls: ['room.component.css'],
  templateUrl: 'room.component.html'

})



export class RoomComponent {
  speakEnd: any;
  bar: any;
  locked: boolean = false;  // 禁止发言
  private head = new Map();

  // speakNow(time) {
  //
  //   this.locked = true;
  //   console.log('发言', time);
  //   setTimeout(() => {
  //     this.locked = false;
  //   }, time * 1000);
  //
  //
  //
  //   this.bar.set(1);
  //   this.bar.text.style.fontFamily = ' Helvetica, sans-serif';
  //   this.bar.text.style.fontSize = '8rem';
  //   this.bar.animate(0., {
  //     duration: time * 1000,
  //   },
  //     function(state, circle) {
  //       circle.path.setAttribute('stroke', state.color);
  //       let value = Math.round(circle.value() * time);
  //       if (value === 0) {
  //         circle.setText('');
  //       } else {
  //         circle.setText(value);
  //       }
  //
  //     });
  //
  //
  //
  //   this.speakEnd = this.socketSevice.speakEnd.subscribe(x => {
  //     this.locked = false;
  //     console.log('时间到，轮到别人发言', this.speakEnd);
  //     this.speakEnd.unsubscribe();
  //   });
  //
  // }


  constructor(
    private socketSevice: SocketSevice,
    private theGameService: TheGameService,
    private userService: UserService) {
    this.head['liberal'] = './pic/liberal.png';
    this.head['Hitler'] = './pic/Hitler.jpg';
    this.head['Fascist'] = './pic/Fascist.png';

  }


  tmp() {
    this.locked = true;
    console.log('11111111111111');
    let bar = new progressBar.Circle('#container', {
      strokeWidth: 6,
      easing: 'easeInOut',
      duration: 1400,
      color: '#FFEA82',
      trailColor: '#eee',
      trailWidth: 1,
      svgStyle: null
    });

    bar.animate(1.0);

  }


  ngOnInit() {
    //
    //   this.socketSevice.speakNow.subscribe(time => this.speakNow(time));
    //   this.bar = new progressBar.Circle('#container', {
    //     color: '#aaa',
    //     strokeWidth: 8,
    //     trailWidth: 6,
    //     // easing: 'easeInOut',
    //
    //     text: {
    //       autoStyleContainer: false
    //     },
    //     from: { color: '#ff0000', a: 0 },
    //     to: { color: '#00ff00', a: 0.5 },
    //     // Set default step function for all animate calls
    //
    //   });
  }


}

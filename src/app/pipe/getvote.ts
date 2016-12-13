import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'getvote' })
export class GetVote implements PipeTransform {

  transform(value: Array<number>): Array<string> {
    let tmp = new Array<string>();
    if (value.indexOf(0) === -1) {
      for (let v of value) {
        tmp.push(this.switchOver(v));
      }
    } else {
      for (let v of value) {
        tmp.push(this.switchNotOver(v));
      }
    }
    return tmp;
  }

  switchOver(value) {

    switch (value) {
      case 0:
        return './pic/think.png';
      case 1:
        return './pic/投票背.jpg';
      case 2:
        return './pic/同意.png';
      case 3:
        return './pic/反对.png';
      case 4:
        return './pic/dead.jpg';
      default:
        return './pic/think.png';
    }

  }
  switchNotOver(value) {
    switch (value) {
      case 0:
        return './pic/think.png';
      case 4:
        return './pic/dead.jpg';
      default:
        return './pic/投票背.jpg';
    }

  }

}
